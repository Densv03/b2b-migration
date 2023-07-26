import { ChangeDetectorRef, Component, HostListener, OnInit } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";
import { CategoriesService } from "../../../../../../../services/categories/categories.service";
import { UnitsService } from "../../../../../../../services/units/units.service";
import { TranslocoService } from "@ngneat/transloco";
import { HotToastService } from "@ngneat/hot-toast";
import { ActivatedRoute, Router } from "@angular/router";
import { TradebidService } from "../../../../../../client-tradebid/tradebid.service";
import { first, map, tap } from "rxjs/operators";
import { snakeCase } from "../../../../../../../../core/helpers/function/snake-case";
import { environment } from "../../../../../../../../../environments/environment.prod";
import { GetUrlExtension } from "../../../../../../../../core/helpers/function/get-url-extension";
import { ImageExtensions } from "../../../../../../../../core/add-offer/image-extensions";
import { DocumentExtensions } from "../../../../../../../../core/add-offer/document-extensions";
import { ClientOfferDocumentComponent } from "../../../../../../client-offer/components/client-offer-document/client-offer-document.component";
import { capitalizeFirstLetter } from "../../../../../../../../core/helpers/function/capitalize-first-letter";
import { CURRENCIES } from "../../../../../../../../core/helpers/constant/currencies";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { onlyLatin } from "../../../../../../../../core/helpers/validator/only-latin";
import { onlyNumber } from "../../../../../../../../core/helpers/validator/only-number";
import { onlyLatinAndNumber } from "../../../../../../../../core/helpers/validator/only-latin-and-number";
import { ClientProfileTradebidService } from "../../../client-profile-tradebid.service";
import {MatDialog} from "@angular/material/dialog";
import {MixpanelService} from "../../../../../../../../core/services/mixpanel/mixpanel.service";

interface SelectItem {
	id: string;
	value: string;
}

@Component({
	selector: "b2b-change-rfq-form",
	templateUrl: "./change-rfq-form.component.html",
	styleUrls: ["./change-rfq-form.component.scss"],
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
export class ChangeRfqFormComponent implements OnInit {
	public form: FormGroup;

	public categories$: Observable<any> = this.getCategories();
	public unit$: Observable<any> = this.getUnit();
	public sourcingPurpose$: Observable<SelectItem[]>;
	public tradeTerms$: Observable<SelectItem[]>;
	public currencies$: Observable<SelectItem[]>;

	public shippingMethod$: Observable<SelectItem[]>;
	public paymentMethod$: Observable<SelectItem[]>;

	public isSubmitButtonActive$: Observable<boolean>;
	public isFileLabelVisible: boolean;

	public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;

	private hideLabelSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private selectedCategory: string;
	constructor(
		private formBuilder: FormBuilder,
		private categoriesService: CategoriesService,
		private unitsService: UnitsService,
		private translocoService: TranslocoService,
		private dialog: MatDialog,
		private hotToastService: HotToastService,
		private router: Router,
		private tradeBidService: TradebidService,
		private changeDetectionRef: ChangeDetectorRef,
		private route: ActivatedRoute,
		private profileTradebidService: ClientProfileTradebidService,
    private readonly mixpanelService: MixpanelService
	) {
		this.form = this.formBuilder.group({
			productInformation: this.createProductInformationGroup(),
			paymentShipping: this.createPaymentShippingGroup(),
		});

		this.sourcingPurpose$ = this.getSourcingPurpose().pipe(
			map((options) => {
				return options.map((option) => {
					return {
						...option,
						value: this.translocoService.translate(`TRADEBID.SOURCING_PURPOSE.${snakeCase(option.value)}`),
					};
				});
			})
		);

		this.tradeTerms$ = this.getTradeTerms().pipe(
			tap((options) => {
				this.form.patchValue({
					productInformation: {
						tradeTerms: options[0].value,
					},
				});
			})
		);

		this.currencies$ = this.getCurrencies().pipe(
			tap((options) => {
				this.form.patchValue({
					productInformation: {
						budget: {
							currency: options.find((option) => option.value === "USD")?.value || options[0].value,
						},
					},
				});
			})
		);

		this.shippingMethod$ = this.getShippingMethod().pipe(
			map((options) => {
				return options.map((option) => {
					return {
						...option,
						value: this.translocoService.translate(`TRADEBID.SHIPPING_METHOD.${snakeCase(option.value)}`),
					};
				});
			})
		);

		this.paymentMethod$ = this.getPaymentMethod().pipe(
			tap((options) => {
				this.form.patchValue({
					paymentShipping: {
						paymentMethod: options[0].value,
					},
				});
			})
		);

		this.isSubmitButtonActive$ = combineLatest([
			this.form.statusChanges,
			this.form.get("paymentShipping").get("readRFQRules").valueChanges,
		]).pipe(
			map(([statusChanges, isReadRFQ]) => {
				return statusChanges === "VALID" && isReadRFQ;
			})
		);
	}

	get hideLabel$(): Observable<boolean> {
		return this.hideLabelSource.asObservable();
	}

	ngOnInit(): void {
		this.form
			.get("productInformation")
			.get("photos")
			.valueChanges.subscribe((data: string | any[]) => {
				this.isFileLabelVisible = !(typeof data === "object" && data.length);
			});
		this.onResize();
		this.patchValueToForm();
	}

	public openDocument(ev: { name: any; }): void {
		const document = this.form.value.documents.find((el: { _id: any; }) => el._id === ev.name);

		const data = {
			fullPath: environment.apiUrl + document.path,
			extension: GetUrlExtension(document.path),
			isImage: ImageExtensions.includes(GetUrlExtension(document.path)),
			isDocument: DocumentExtensions.includes(GetUrlExtension(document.path)),
		};

		this.dialog.open(ClientOfferDocumentComponent, {
			data,
			width: "80vw",
			height: "80vh",
		});
	}

  public selectCategory(event: any): void {
    this.selectedCategory = event.value
  }

	public submitForm(form: FormGroup): void {
		const body = this.getFormData(this.getBodyRequest(form));
		this.profileTradebidService
			.editItem(body)
			.pipe(
				first(),
				this.hotToastService.observe({
					loading: "Updating RFQ...",
					success: "RFQ successfully updated.",
					error: "RFQ updating failed",
				})
			)
			.subscribe({
				complete: () => {
          this.mixpanelService.track('RFQ edited', {
            'Product Sector': this.selectedCategory,
            'Destination': form.value.pymentShipping?.destination
          });
					this.router.navigate(["/profile/your-workspace/tradebid/my-rfq"]);
				},
			});
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

	private getBodyRequest(form: FormGroup): any {
		const productInformation = form.value.productInformation;
		const paymentShipping = form.value.paymentShipping;

		return {
			productName: productInformation.productName,
			quantity: productInformation.quantity.quantity,
			budget: productInformation.budget.maxBudget,
			currency: productInformation.budget.currency,
			measure: productInformation.quantity.measure,
			thePurposeOfSourcing: productInformation.sourcingPurpose,
			tradeTerms: productInformation.tradeTerms,
			category: productInformation.category,
			moreInformation: productInformation.moreInformation,
			photos: productInformation.photos,
			shippingMethod: paymentShipping.shippingMethod,
			paymentMethod: paymentShipping.paymentMethod,
			destination: paymentShipping.destination,
			rfqId: this.route.snapshot.params["id"],
		};
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

	private getSourcingPurpose(): Observable<SelectItem[]> {
		return this.tradeBidService.getObservableForSelect([
			"Own consumption",
			"Wholesale distribution",
			"Retail",
			"Manufacturing purpose",
			"Government supply",
		]);
	}

	private getTradeTerms(): Observable<SelectItem[]> {
		return this.tradeBidService.getObservableForSelect([
			"CIF",
			"EXW",
			"FCA",
			"CPT",
			"CIP",
			"DAP",
			"DPU",
			"DDP",
			"FAS",
			"FOB",
			"CFR",
		]);
	}

	private getCurrencies(): Observable<SelectItem[]> {
		return this.tradeBidService.getObservableForSelect(CURRENCIES);
	}

	private getShippingMethod(): Observable<SelectItem[]> {
		return this.tradeBidService.getObservableForSelect(["Sea freight", "Land freight", "Air Freight"]);
	}

	private getPaymentMethod(): Observable<SelectItem[]> {
		return this.tradeBidService.getObservableForSelect(["T/T", "L/C", "D/P", "Western Union", "Money Gram"]);
	}

	private createProductInformationGroup(): FormGroup {
		return this.formBuilder.group({
			productName: [null, [Validators.required, onlyLatin()]],
			category: [null, Validators.required],
			sourcingPurpose: [null, Validators.required],
			quantity: this.formBuilder.group({
				quantity: [null, [Validators.required, onlyNumber()]],
				measure: [null, Validators.required],
			}),
			tradeTerms: [null, Validators.required],
			budget: this.formBuilder.group({
				maxBudget: [null, [Validators.required, onlyNumber()]],
				currency: [null, Validators.required],
			}),
			moreInformation: [null, [Validators.required, Validators.minLength(20), onlyLatinAndNumber()]],
			photos: [[]],
		});
	}

	private createPaymentShippingGroup(): FormGroup {
		return this.formBuilder.group({
			shippingMethod: [null, Validators.required],
			destination: [null, Validators.required],
			paymentMethod: [null, Validators.required],
			readRFQRules: [false, Validators.required],
		});
	}

	private getCategories(): Observable<any> {
		return this.categoriesService
			.getCategories()
			.pipe(map(({ categories }) => categories.map((category: { _id: any; name: any; }) => ({ id: category._id, value: category.name }))));
	}

	@HostListener("window:resize", ["$event"])
	private onResize(): void {
		this.hideLabelSource.next(window.innerWidth < 889);
	}

	private patchValueToForm(): void {
		this.tradeBidService.getRfqById(this.route.snapshot.params['id']).subscribe((el) => {
			this.form.patchValue({
				productInformation: {
					productName: el?.productName,
					category: el?.category,
					sourcingPurpose: el?.thePurposeOfSourcing,
					quantity: {
						quantity: el?.quantity,
						measure: el?.measure,
					},
					tradeTerms: el?.tradeTerms,
					budget: {
						maxBudget: el?.budget,
						currency: el?.currency,
					},
					moreInformation: el?.moreInformation,
					photos: el?.photos,
				},
				paymentShipping: {
					shippingMethod: el?.shippingMethod,
					destination: el?.destination?.to,
					paymentMethod: el?.paymentMethod,
					readRFQRules: true,
				},
			});
		});
	}
}
