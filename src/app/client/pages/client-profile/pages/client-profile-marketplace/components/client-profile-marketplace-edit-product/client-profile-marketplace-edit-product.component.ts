import { ChangeDetectionStrategy, Component, HostListener, OnInit } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import { BehaviorSubject, combineLatest, filter, Observable } from "rxjs";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { UnitsService } from "../../../../../../services/units/units.service";
import { UserService } from "../../../../services/user/user.service";
import { TranslocoService } from "@ngneat/transloco";
import { TradebidService } from "../../../../../client-tradebid/tradebid.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { HotToastService } from "@ngneat/hot-toast";
import { map } from "rxjs/operators";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { onlyNumber } from "../../../../../../../core/helpers/validator/only-number";
import { capitalizeFirstLetter } from "../../../../../../../core/helpers/function/capitalize-first-letter";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import {CategoriesService} from "../../../../../../services/categories/categories.service";
import {
  ClientMarketplaceService
} from "../../../../../../shared/services/client-marketplace-service/client-marketplace.service";
import {MixpanelService} from "../../../../../../../core/services/mixpanel/mixpanel.service";

export enum EditMode {
	ARCHIVE = "archive",
	EDIT = "edit",
}

@UntilDestroy(this)
@Component({
	selector: "b2b-client-profile-marketplace-edit-product",
	templateUrl: "./client-profile-marketplace-edit-product.component.html",
	styleUrls: ["./client-profile-marketplace-edit-product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger("fadeInOut", [
			transition(":enter", [
				// :enter is alias to 'void => *'
				style({ opacity: 0 }),
				animate(500, style({ opacity: 1 })),
			]),
			transition(":leave", [
				// :leave is alias to '* => void'
				animate(500, style({ opacity: 0 })),
			]),
		]),
	],
})
export class ClientProfileMarketplaceEditProductComponent implements OnInit {
	public PRODUCTS_LIMIT: number = this.clientMarketplaceService.PRODUCTS_LIMIT;
	public formGroup: FormGroup;
	public formState: { [key: string]: AbstractControl };
	public editMode: EditMode;
	public EditModeEnum = EditMode;
	public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public unit$: Observable<any> = this.getUnit();
	private isRedirectFromAdminPanel = !!this.activatedRoute.snapshot.queryParams?.["admin"];

	public readonly shippingMethods = this.getArrayForSelect(this.clientMarketplaceService.shippingMethods);
	public readonly paymentMethods = this.getArrayForSelect(this.clientMarketplaceService.paymentMethods);
	private hideLabelSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private productId: string = this.activatedRoute.snapshot.params["id"];

	constructor(
		private unitsService: UnitsService,
		private userService: UserService,
		private translocoService: TranslocoService,
		private formBuilder: FormBuilder,
		private clientMarketplaceService: ClientMarketplaceService,
		private tradebidService: TradebidService,
		private activatedRoute: ActivatedRoute,
		public dialog: MatDialog,
		private hotToastService: HotToastService,
		private router: Router,
		private categoriesService: CategoriesService,
    private readonly mixpanelService: MixpanelService
	) {
		this.formGroup = this.createFormGroup();
		this.formState = this.formGroup.controls;
	}

	ngOnInit(): void {
		this.detectEditMode();

		this.onResize();
		this.patchForm();

		this.categoriesService.getCategories();
	}
	get hideLabel$(): Observable<boolean> {
		return this.hideLabelSource.asObservable();
	}

	@HostListener("window:resize", ["$event"])
	private onResize(): void {
		this.hideLabelSource.next(window.innerWidth < 889);
	}

	public cancel(): void {
		this.router.navigate(["profile/your-workspace/b2bmarket"]);
	}

	public delete(): void {}

	public archive(): void {
		this.clientMarketplaceService
			.archiveProduct(this.productId)
			.pipe(
				this.hotToastService.observe({
					loading: "Archiving...",
					success: "Product archived successfully",
					error: "Archiving failed",
				})
			)
			.subscribe(() => {
        this.mixpanelService.track('Product archived', {
          'Product Category': this.formGroup.value.category,
          'Supplier\'s Country': this.formGroup.value.country,
          'Product Count': this.formGroup.value.amount,
          'Posting Date': Date()
        });
				// this.clientMarketplaceService.updateMarketplaceProducts(this.filteredQueryObj);
				this.router.navigate(["profile/your-workspace/b2bmarket"]);
			});
	}

	public updateProduct(): void {
		this.formGroup.markAllAsTouched();
		if (this.formGroup.invalid) {
			return;
		}

		if (this.isRedirectFromAdminPanel) {
			this.updateProductByAdmin();
		} else {
			this.updateProductByUser();
			this.tradebidService.updateCompanyInfo({companyDescription: this.formGroup.value.companyDescription}).subscribe()
		}
    this.mixpanelService.track('Product edited', {
      'Product Category': this.formGroup.value.category,
      'Supplier\'s Country': this.formGroup.value.country,
      'Product Count': this.formGroup.value.amount,
      'Posting Date': Date()
    });
	}

	public updateAndRestore(): void {
		if (!this.formGroup.valid) {
			this.formGroup.markAllAsTouched();
			return;
		}

		combineLatest([
			this.clientMarketplaceService.updateProduct(
				this.productId,
				this.getFormData(this.getBodyForRequest(this.formGroup))
			),
			this.clientMarketplaceService.restoreProduct(this.productId),
		])
			.pipe(
				this.hotToastService.observe({
					loading: "Restoring product...",
					success: "Product restored",
					error: "Error restoring product",
				})
			)
			.subscribe(() => {
				this.clientMarketplaceService.updateManageProducts((1 - 1) * this.PRODUCTS_LIMIT);

				this.router.navigate(["/profile/your-workspace/b2bmarket"]);
			});
	}

	private getBodyForRequest(data: FormGroup): any {
		const userInfo = this.userService.getUser();
		return {
			...data.value,
			amount: data.value.amount,
			paymentMethods: data.value.paymentMethods,
			shipping: data.value.shipping,
			suppliersType: userInfo.role.displayName === "Admin" ? "Trader" : userInfo.role.displayName,
			contactPersonName: userInfo.fullName,
			contactCompanyName: userInfo.company,
			contactPhoneNumber: userInfo.phone.number,
			contactPhoneInternationalNumber: userInfo.phone.internationalNumber,
			contactPhoneNationalNumber: userInfo.phone.nationalNumber,
			contactPhoneE164Number: userInfo.phone.e164Number,
			contactPhoneCountryCode: userInfo.phone.countryCode,
			contactPhoneDialCode: userInfo.phone.dialCode,
			contactEmail: userInfo.email,
			country: this.formState["country"].value,
		};
	}

	private createFormGroup(): FormGroup {
		return this.formBuilder.group({
			title: [null, Validators.required],
			specifications: [null, Validators.required],
			amount: [null, [Validators.required]],
			unit: [null, Validators.required],
			category: [null, Validators.required],
			photos: [null, Validators.required],
			visibilityPhotos: [true],
			price: [null, [Validators.required, onlyNumber()]],
			shipping: [null, Validators.required],
			paymentMethods: [null, Validators.required],
			country: [null, Validators.required],
		});
	}

	private getArrayForSelect(array: any[]): Array<{ value: any; label: string }> {
		return array.map((el) => {
			return {
				value: el,
				label: el,
			};
		});
	}

	private patchForm(): void {
		combineLatest([
			this.tradebidService.getCompanyData(),
			this.clientMarketplaceService.getProductById(this.productId),
		// 	FIXME: update categories model to remove Array<any>
		]).subscribe(([ { country }, { product }]: Array<any>) => {
			this.formGroup.patchValue({
				country: product.country,
				title: product?.title,
				specifications: product?.specifications,
				amount: product.amount?.count,
				unit: product.amount?.unit._id,
				category: product.category?._id,
				photos: product?.photos,
				visibilityPhotos: product?.visibility?.photos,
				price: product.price?.old,
				shipping: product?.shipping,
				paymentMethods: product?.paymentMethods,
			});
		});
	}

	private getUnit(): Observable<any> {
		return this.unitsService.getUnits().pipe(
			map((units) =>
				units.map((unit: { name: string; }) => ({
					...unit,
					displayName: this.translocoService.translate(`UNITS.${unit.name.toUpperCase()}`),
				}))
			)
		);
	}

	private getFormData(data: any): FormData {
		const formData = new FormData();

		Object.entries(data)
			.filter(([, value]) => !!value)
			.forEach(([key, value]: [string, any]) => {
				if (key === "photos" || key === "documents") {
					Array.from(value).forEach((file: any) => {
						formData.append(key, file);
					});
				} else if (Array.isArray(value)) {
					value
						.filter((arrayItem) => !!arrayItem)
						.forEach((arrayItem) => {
							formData.append(key, arrayItem);
						});
				} else if (typeof value === "object" && value) {
					for (const childKey in value) {
						const fullKey = `${key}${capitalizeFirstLetter(childKey)}`;
						formData.append(fullKey, value[childKey]);
					}
				} else {
					formData.append(key, value);
				}
			});

		return formData;
	}

	private updateProductByUser(): void {

		this.clientMarketplaceService
			.updateProduct(this.productId, this.getFormData(this.getBodyForRequest(this.formGroup)))
			.pipe(
				this.hotToastService.observe({
					loading: "Updating product...",
					success: "Product updated successfully",
					error: "Error updating product",
				})
			)
			.subscribe(() => {
				this.router.navigate(["profile/your-workspace/b2bmarket"]);
			});
	}

	private updateProductByAdmin(): void {

		this.clientMarketplaceService
			.updateProductByAdmin(this.productId, this.getFormData(this.getBodyForRequest(this.formGroup)))
			.pipe(
				this.hotToastService.observe({
					loading: "Updating product...",
					success: "Product updated successfully",
					error: "Error updating product",
				})
			)
			.subscribe(() => {
				this.router.navigate(["/admin/b2bmarket"]);
			});
	}

	private detectEditMode(): void {
		this.activatedRoute.queryParams
			.pipe(
				map((data) => data["mode"]),
				filter((data) => !!data),
				untilDestroyed(this)
			)
			.subscribe((mode) => (this.editMode = mode));
	}
}
