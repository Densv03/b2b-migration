import { Component, HostListener, OnInit } from "@angular/core";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { onlyNumber } from "../../../../../core/helpers/validator/only-number";
import { ClientMarketplaceService } from "../../client-marketplace.service";
import { TradebidService } from "../../../client-tradebid/tradebid.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, exhaustMap, Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { UnitsService } from "../../../../services/units/units.service";
import { TranslocoService } from "@ngneat/transloco";
import { MatDialog } from "@angular/material/dialog";
import { capitalizeFirstLetter } from "../../../../../core/helpers/function/capitalize-first-letter";
import { UserService } from "../../../client-profile/services/user/user.service";
import { HotToastService } from "@ngneat/hot-toast";
import { animate, style, transition, trigger } from "@angular/animations";
import { CategoriesService } from "../../../../services/categories/categories.service";
import { UntilDestroy } from "@ngneat/until-destroy";
import {MixpanelService} from "../../../../../core/services/mixpanel/mixpanel.service";

@UntilDestroy()
@Component({
	selector: "b2b-client-marketplace-add-product",
	templateUrl: "./client-marketplace-add-product.component.html",
	styleUrls: ["./client-marketplace-add-product.component.scss"],
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
export class ClientMarketplaceAddProductComponent implements OnInit {
	public formGroup: FormGroup;
	public formState: { [key: string]: AbstractControl };
	public selectedCategoriesFromModal: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
	public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public unit$: Observable<any> = this.getUnit();

	public readonly shippingMethods = this.getArrayForSelect(this.clientMarketplaceService.shippingMethods);
	public readonly paymentMethods = this.getArrayForSelect(this.clientMarketplaceService.paymentMethods);

	private isBadgeInvalidSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isBadgeInvalid$: Observable<boolean> = this.isBadgeInvalidSource.asObservable();

	private hideLabelSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	private productId?: string = this.activatedRoute.snapshot.params["id"];

	constructor(
		private unitsService: UnitsService,
		private userService: UserService,
		private translocoService: TranslocoService,
		private formBuilder: FormBuilder,
		private clientMarketplaceService: ClientMarketplaceService,
		private tradebidService: TradebidService,
		private activatedRoute: ActivatedRoute,
		private dialog: MatDialog,
		private hotToastService: HotToastService,
		private router: Router,
		private categoriesService: CategoriesService,
    private readonly mixpanelService: MixpanelService
	) {
		this.formGroup = this.createFormGroup();
		this.formState = this.formGroup.controls;
	}

	ngOnInit(): void {
		this.onResize();
		this.categoriesService.getCategories();
		this.updateIsBadgeInvalidSource();
	}

	public get hideLabel$(): Observable<boolean> {
		return this.hideLabelSource.asObservable();
	}

	@HostListener("window:resize", ["$event"])
	private onResize(): void {
		this.hideLabelSource.next(window.innerWidth < 889);
	}

	public cancel(): void {
		this.router.navigate(["profile/your-workspace/b2bmarket"]);
	}

	public submitForm(): void {
		if (!this.formGroup.valid) {
			this.formGroup.markAllAsTouched();
			this.isBadgeInvalidSource.next(true);
			return;
		}

		this.tradebidService
			.getCompanyData()
			.pipe(
				first(),
				exhaustMap((company) => {
					return this.clientMarketplaceService
						.createProduct(this.getFormData(this.getBodyForRequest(this.formGroup, company)))
						.pipe(
							this.hotToastService.observe({
								loading: "Product is creating...",
								success: "Product created successfully",
								error: "Product creation failed",
							})
						);
				})
			)
			.subscribe(() => {
        this.mixpanelService.track('User created and posted a new product and product was approved', {
          'Product Category': this.formGroup.value.category[0],
          'Supplier\'s Country': this.formGroup.value.country,
          'Product Count': this.formGroup.value.country.amount,
          'Posting Date': Date()
        });
        if (this.userService.getUser().statistics.products.created === 0 &&
          this.userService.getUser().statistics.rfq.created === 0 &&
          this.userService.getUser().statistics.offers.created === 0) {
        }
				this.router.navigate(["/b2bmarket/product-posting-complete"]);
			});
	}

	private getBodyForRequest(data: FormGroup, company: any): any {
		const userInfo = this.userService.getUser();
		return {
			...data.value,
			amount: data.value.amount,
			paymentMethods: data.value.paymentMethods,
			shipping: data.value.shipping,
			suppliersType: userInfo.role.displayName === "Admin" ? "Trader" : userInfo.role.displayName,
			contactPersonName: userInfo.fullName,
			contactCompanyName: userInfo.company,
			contactPhoneNumber: userInfo.phone.number || company.phone.number,
			contactPhoneInternationalNumber: userInfo.phone.internationalNumber || company.phone.internationalNumber,
			contactPhoneNationalNumber: userInfo.phone.nationalNumber || company.phone.nationalNumber,
			contactPhoneE164Number: userInfo.phone.e164Number || company.phone.e164Number,
			contactPhoneCountryCode: userInfo.phone.countryCode || company.phone.countryCode,
			contactPhoneDialCode: userInfo.phone.dialCode || company.phone.dialCode,
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

	private updateIsBadgeInvalidSource(): void {
		this.formGroup.valueChanges
			.pipe(
				map(() => this.formGroup.invalid && Object.values(this.formGroup.controls).every((control) => control.touched))
			)
			.subscribe((status) => this.isBadgeInvalidSource.next(status));
	}
}
