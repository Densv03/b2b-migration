import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { BehaviorSubject, delay, filter, Observable, of, timer } from "rxjs";
import { catchError, first, map, tap } from "rxjs/operators";

import { TranslocoService } from "@ngneat/transloco";
import { HotToastService } from "@ngneat/hot-toast";

import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";

import { CategoriesService } from "../../../services/categories/categories.service";
import { UnitsService } from "../../../services/units/units.service";
import { CURRENCIES } from "../../../../core/helpers/constant/currencies";
import { environment } from "../../../../../environments/environment.prod";
import { ClientOfferDocumentComponent } from "../../client-offer/components/client-offer-document/client-offer-document.component";
import { GetUrlExtension } from "../../../../core/helpers/function/get-url-extension";
import { ImageExtensions } from "../../../../core/add-offer/image-extensions";
import { DocumentExtensions } from "../../../../core/add-offer/document-extensions";
import { snakeCase } from "../../../../core/helpers/function/snake-case";
import { capitalizeFirstLetter } from "../../../../core/helpers/function/capitalize-first-letter";
import { TradebidService } from "../tradebid.service";
import { animate, style, transition, trigger } from "@angular/animations";
import { UserService } from "../../client-profile/services/user/user.service";
import { onlyLatinAndNumberAndSymbols } from "../../../../core/helpers/validator/only -latin-numbers-symbols";
import { onlyLatinAndSymbols } from "../../../../core/helpers/validator/only-latin-symbols";
import { onlyNumberandSymbols } from "../../../../core/helpers/validator/only-number-symbols";
import {Dialog} from "@angular/cdk/dialog";

interface SelectItem {
	id: string;
	value: string;
}

@Component({
	selector: "b2b-client-trade-bid-add-rfq",
	templateUrl: "./client-trade-bid-add-rfq.component.html",
	styleUrls: ["./client-trade-bid-add-rfq.component.scss"],
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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTradeBidAddRfqComponent implements OnInit, OnDestroy {
	public form: FormGroup;

	public categories$: Observable<any> = this.getCategories();
	public unit$: Observable<any> = this.getUnit();
	public sourcingPurpose$: Observable<SelectItem[]>;
	public tradeTerms$: Observable<SelectItem[]>;
	public currencies$: Observable<SelectItem[]>;

	public shippingMethod$: Observable<SelectItem[]>;
	public paymentMethod$: Observable<SelectItem[]>;

	public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
	public showCancelBtn: boolean;

	private hideLabelSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private isAdminPage: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private categoriesService: CategoriesService,
		private unitsService: UnitsService,
		private translocoService: TranslocoService,
    private dialog: Dialog,
		private hotToastService: HotToastService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private tradeBidService: TradebidService,
		private userService: UserService,
		private route: ActivatedRoute
	) {
		this.showCancelBtn = !!localStorage.getItem("showCancelButton");

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
	}

	get hideLabel$(): Observable<boolean> {
		return this.hideLabelSource.asObservable();
	}

	ngOnInit(): void {
		this.onResize();
		this.activatedRoute.params.subscribe((data) => {
			if (data["id"]) {
				this.isAdminPage = true;
				this.tradeBidService.getRfqById(data["id"]).subscribe((rfq) => this.updateForm(rfq));
			}
		});
	}

	private updateForm(rfq: any): void {
		this.form.patchValue({
			productInformation: {
				productName: rfq.productName,
				quantity: {
					quantity: rfq.quantity,
					measure: rfq.measure,
				},
				budget: {
					maxBudget: rfq.budget,
					currency: rfq.currency,
				},
				sourcingPurpose: rfq.thePurposeOfSourcing,
				tradeTerms: rfq.tradeTerms,
				category: rfq.category,
				moreInformation: rfq.moreInformation,
			},
			paymentShipping: {
				shippingMethod: rfq.shippingMethod,
				destination: rfq.destination.to,
				paymentMethod: rfq.paymentMethod,
			},
		});
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

	public backToCompanyForm(): void {
		this.router.navigate(["tradebid/company-information"], { queryParams: { url: "add-rfq" } });
	}

	public submitForm(form: FormGroup): void {
		if (form.status === "INVALID") {
			return;
		}
		const rfqId = this.route.snapshot.paramMap.get("id");
		const body = this.isAdminPage && rfqId
			? this.getFormData(this.getBodyRequest(form, rfqId))
			: this.getFormData(this.getBodyRequest(form));
		if (this.isAdminPage) {
			this.tradeBidService
				.updateRfqAdmin(body)
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
						this.router.navigate(["/admin/tradebid"]);
					},
				});
		} else {
			this.tradeBidService
				.createRFQ(body)
				.pipe(
					first(),
					tap(() => {
						this.hotToastService.loading("Creating RFQ...", { duration: 1500 });
					}),
					delay(1500),
					catchError(() => {
						this.hotToastService.error("RFQ creating failed");
						return of(null);
					})
				)
				.subscribe({
					next: () => {
						this.hotToastService.success("RFQ successfully created.", { duration: 6000 });
						const element = document.querySelector("hot-toast-container");
						if (element) {
							element.id = "add-rfq-popup";
						}
					},
					complete: () => {
						const element = document.querySelector("hot-toast-container");
						if (element) {
							element.id = "add-rfq-popup";
						}
						this.router.navigate(["/tradebid/listing"]);
					},
				});
		}
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

	private getBodyRequest(form: FormGroup, rfqId?: string): any {
		const productInformation = form.value.productInformation;
		const paymentShipping = form.value.paymentShipping;

		const obj = {
			productName: productInformation.productName,
			quantity: productInformation.quantity.quantity,
			measure: productInformation.quantity.measure,
			budget: productInformation.budget.maxBudget,
			currency: productInformation.budget.currency,
			thePurposeOfSourcing: productInformation.sourcingPurpose,
			tradeTerms: productInformation.tradeTerms,
			category: productInformation.category,
			moreInformation: productInformation.moreInformation,
			shippingMethod: paymentShipping.shippingMethod,
			paymentMethod: paymentShipping.paymentMethod,
			destination: paymentShipping.destination,
      rfqId: paymentShipping.rfqId
		};

		if (this.isAdminPage) {
			obj["rfqId"] = rfqId;
		}

		return obj;
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
			productName: [null, [Validators.required, onlyLatinAndSymbols()]],
			category: [null, Validators.required],
			sourcingPurpose: [null, Validators.required],
			quantity: this.formBuilder.group({
				quantity: [null, [Validators.required, onlyNumberandSymbols()]],
				measure: [null, Validators.required],
			}),
			tradeTerms: [null, Validators.required],
			budget: this.formBuilder.group({
				maxBudget: [null, [Validators.required, onlyNumberandSymbols()]],
				currency: [null, Validators.required],
			}),
			moreInformation: [null, [Validators.minLength(20), onlyLatinAndNumberAndSymbols()]],
		});
	}

	private createPaymentShippingGroup(): FormGroup {
		return this.formBuilder.group({
			shippingMethod: [null, Validators.required],
			destination: [null, Validators.required],
			paymentMethod: [null, Validators.required],
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

	ngOnDestroy(): void {
		localStorage.removeItem("showCancelButton");
	}
}
