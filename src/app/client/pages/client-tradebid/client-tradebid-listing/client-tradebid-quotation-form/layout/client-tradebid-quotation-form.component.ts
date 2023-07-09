import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Validators } from "@angular/forms";

import { FormBuilder, FormGroup } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { HotToastService } from "@ngneat/hot-toast";

import { BehaviorSubject, filter, Observable } from "rxjs";
import { tap, switchMap, first, map, take } from "rxjs/operators";

import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";

import { onlyNumber } from "../../../../../../core/helpers/validator/only-number";
import { TradebidService } from "../../../tradebid.service";
import { CategoriesService } from "../../../../../services/categories/categories.service";
import { capitalizeFirstLetter } from "../../../../../../core/helpers/function/capitalize-first-letter";
import { UserService } from "../../../../client-profile/services/user/user.service";
import { UnitsService } from "../../../../../services/units/units.service";
import { onlyLatin } from "../../../../../../core/helpers/validator/only-latin";
import { onlyLatinAndNumber } from "../../../../../../core/helpers/validator/only-latin-and-number";
import { animate, style, transition, trigger } from "@angular/animations";
import { io } from "socket.io-client";
import { environment } from "../../../../../../../environments/environment";
import { onlyLatinAndNumberAndSymbols } from "../../../../../../core/helpers/validator/only -latin-numbers-symbols";
import { AuthService } from "../../../../../../auth/services/auth/auth.service";
import { onlyLatinAndSymbols } from "../../../../../../core/helpers/validator/only-latin-symbols";
import { onlyNumberandSymbols } from "../../../../../../core/helpers/validator/only-number-symbols";
import {siteLink} from "../../../../../../core/helpers/validator/site-link";

interface SelectItem {
	value: string;
	id: string;
}

interface SuppliersCompanyInfo {
	companyName: string;
	country: string;
	website?: string;
	foundationYear: string;
	businessType: string;
	companyDescription?: string;
	contactPerson: string;
	email?: string;
	phone: any;
}

@UntilDestroy()
@Component({
	selector: "b2b-client-tradebid-quotation-form",
	templateUrl: "./client-tradebid-quotation-form.component.html",
	styleUrls: ["./client-tradebid-quotation-form.component.scss"],
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
export class ClientTradebidQuotationFormComponent implements OnInit, OnDestroy {
	public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;

	public form: FormGroup;

	public tradeTerms$: Observable<SelectItem[]>;
	public productionYear$: Observable<SelectItem[]>;
	public foundationYear$: Observable<SelectItem[]>;
	public businessType$: Observable<SelectItem[]>;
	public showProductionYear: boolean = true;
	public unit$: Observable<any>;
	public showCustomUnitInput$: Observable<boolean>;
	public isFileLabelVisible: boolean = true;
	public rfq: any;
	public showCancelBtn: boolean;

	public isSubmitEnabled: boolean;

	private readonly rfqId: string;
	private productionOrCropsYearSource: BehaviorSubject<string> = new BehaviorSubject<string>("");
	private businessTypesArr: string[] = [
		"Manufacturer",
		"Exporter",
		"Trader",
		"Broker",
		"Farming company",
		"Supplier",
		"Etc.",
	];
	private socket: any;

	public readonly offer$: Observable<any>;

	constructor(
		private formBuilder: FormBuilder,
		private tradeBidService: TradebidService,
		private route: ActivatedRoute,
		private router: Router,
		private categoriesService: CategoriesService,
		private changeDetectionRef: ChangeDetectorRef,
		private hotToastService: HotToastService,
		private userService: UserService,
		private unitsService: UnitsService,
		private _activatedRoute: ActivatedRoute,
		private tradebidService: TradebidService,
		private authService: AuthService
	) {
		this.showCancelBtn = !!localStorage.getItem("showCancelButton");

		this.rfqId = this.route.snapshot.params.id;
		this.form = this.formBuilder.group({
			quotationForm: this.createQuotationFromGroup(),
			// suppliersCompanyInfo: this.createSuppliersCompanyInfo(),
		});

		this.tradeTerms$ = this.getTradeTerms().pipe(
			tap((options) => {
				this.form.patchValue({
					quotationForm: {
						price: {
							tradeTerms: options[0].value,
						},
					},
				});
			}),
			first()
		);

		this.productionYear$ = this.getProductionYear();
		this.foundationYear$ = this.getFoundationYear();
		this.businessType$ = this.getBusinessType();
		this.unit$ = this.unitsService.getUnits().pipe(map((data: any) => [...data, { displayName: "Other" }]));

		this.showCustomUnitInput$ = this.form
			.get("quotationForm")
			.get("unit")
			.valueChanges.pipe(map((data) => data === "Other"));
		this.offer$ = this.getOffer();
	}

	get productionOrCropsYear$(): Observable<string> {
		return this.productionOrCropsYearSource.asObservable();
	}

	public ngOnInit(): void {
		this.openConnection(this.authService.getToken());

		this.offer$
			.pipe(
				untilDestroyed(this),
				filter((offer) => !!offer)
			)
			.subscribe((offer) => {
				this.updateForm(offer);
			});

		this.form
			.get("quotationForm")
			.get("photos")
			.valueChanges.subscribe((data) => {
				this.isFileLabelVisible = !(data && typeof data === "object" && data.length > 0);
			});
		this.tradeBidService
			.getRfqById(this.rfqId)
			.pipe(
				switchMap((rfq: any) => {
					this.rfq = rfq;
					return this.categoriesService.getCategoryNameById(rfq.category);
				}),
				untilDestroyed(this)
			)
			.subscribe((categoryName) => {
				this.showProductionYear = categoryName === "Agricultural";
				categoryName === "Agricultural"
					? this.productionOrCropsYearSource.next("Crops year")
					: this.productionOrCropsYearSource.next("Production year");
			});

		// this.getCompanyData()
		// 	.pipe(first())
		// 	.subscribe(data => {
		// 		this.initForm({
		// 			companyName: data.companyName || '',
		// 			country: data.country || '',
		// 			email: data.email || '',
		// 			phone: data.phone || '',
		// 			businessType: data.businessType || null,
		// 			companyDescription: data.companyDescription || '',
		// 			contactPerson: data.contactPerson || '',
		// 			website: data.website || '',
		// 			foundationYear: data.yearOfFoundation || null,
		// 		});
		// 	})

		this.form.valueChanges.subscribe(() =>
			this.form.status === "VALID" ? (this.isSubmitEnabled = false) : (this.isSubmitEnabled = true)
		);
	}

	public addValidator(e: any): void {
		if (e?.displayName === "Other") {
			this.form.get("quotationForm").get("otherUnit").setValidators([Validators.required, onlyLatinAndNumber()]);
			this.form.get("quotationForm").get("otherUnit").updateValueAndValidity();
		} else {
			this.form.get("quotationForm").get("otherUnit").clearValidators();
			this.form.get("quotationForm").get("otherUnit").updateValueAndValidity();
		}
	}

	public backToCompanyForm(): void {
		this.router.navigate(["tradebid/company-information"], { queryParams: { url: "quotation" } });
	}

	public submitForm(): void {
		const body = this.getFormData(this.getBodyRequest(this.form));
		this.tradeBidService
			.createQuotation(body)
			.pipe(
				first(),
				this.hotToastService.observe({
					loading: "Sending quotation...",
					success: "Quotation successfully sent",
					error: "Quotation sending failed",
				})
			)
			.subscribe({
				error: () => this.form.reset(),
				complete: () => this.router.navigate(["/tradebid/listing"]),
				next: (response) => {
					this.startChat(response.rfq, this.userService.getUser()._id);
					this.tradebidService.sendMessageToSeller(
						this.rfq,
						this.form.get("quotationForm").get("moreInformation").value
					);
				},
			});

		this.updateCompanyInfo(this.form).pipe(first()).subscribe();
	}

	public sendMessage(body) {
		this.socket.emit("message", {
			type: "text",
			body,
			userId: this.rfq.user._id,
			rfqId: this.rfqId,
			typeRoom: "rfq",
		});
	}

	private openConnection(token) {
		if (this.socket) {
			this.socket.disconnect();
		}

		this.socket = io(environment.apiUrl, {
			path: "/chat",
			auth: {
				token,
			},
		});
	}

	private createQuotationFromGroup(): FormGroup {
		return this.formBuilder.group({
			productName: [null, [Validators.required, onlyLatinAndSymbols()]],
			specifications: [null, [Validators.required, onlyLatinAndNumberAndSymbols()]],
			productionYear: [null, [Validators.required]],
			price: this.formBuilder.group({
				price: [null, [Validators.required, onlyNumberandSymbols()]],
				tradeTerms: [null, [Validators.required]],
			}),
			unit: [null, [Validators.required]],
			otherUnit: [null],
			moreInformation: [null, [Validators.required, Validators.minLength(20), onlyLatinAndNumberAndSymbols()]],
			photos: [[], []],
		});
	}

	private createSuppliersCompanyInfo(): FormGroup {
		return this.formBuilder.group({
			companyName: [null, [Validators.required, onlyLatin()]],
			country: [null, [Validators.required]],
			website: [null, [siteLink()]],
			foundationYear: [null, [Validators.required]],
			businessType: [null, [Validators.required]],
			companyDescription: [null, [Validators.required, onlyLatinAndNumberAndSymbols()]],
			contactPerson: [null, [onlyLatin()]],
			email: [null, [Validators.required, Validators.email]],
			phone: [null, [Validators.required]],
			whatsapp: [false],
			telegram: [false],
		});
	}

	private getBodyRequest(form: FormGroup): any {
		const quotationForm = form.value.quotationForm;
		return {
			productName: quotationForm.productName,
			specification: quotationForm.specifications,
			year: quotationForm.productionYear,
			priceOffer: quotationForm.price.price,
			tradeTerms: quotationForm.price.tradeTerms,
			unitMeasure: quotationForm.unit || quotationForm.otherUnit,
			moreInformation: quotationForm.moreInformation,
			rfqId: this.rfqId,
			photos: quotationForm.photos,
		};
	}

	private getTradeTerms(): Observable<SelectItem[]> {
		return this.tradeBidService.getObservableForSelect([
			"FCA",
			"EXW",
			"CPT",
			"CIP",
			"DAP",
			"DPU",
			"DDP",
			"FAS",
			"FOB",
			"CFR",
			"CIF",
			"USD",
		]);
	}

	private getProductionYear(): Observable<SelectItem[]> {
		const yearsArr: string[] = ["Production against order"];
		const currentYear: number = new Date(Date.now()).getFullYear();
		for (let i = currentYear; i > currentYear - 100; i--) yearsArr.push(i.toString());
		return this.tradeBidService.getObservableForSelect(yearsArr);
	}

	private getFoundationYear(): Observable<SelectItem[]> {
		const yearsArr: string[] = [];
		const currentYear: number = new Date(Date.now()).getFullYear();
		for (let i = currentYear; i > currentYear - 200; i--) yearsArr.push(i.toString());
		return this.tradeBidService.getObservableForSelect(yearsArr);
	}

	private getBusinessType(): Observable<SelectItem[]> {
		return this.tradeBidService.getObservableForSelect(this.businessTypesArr);
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

	// private initForm(data: SuppliersCompanyInfo): void {
	// 	this.tradeBidService.getCompanyData().subscribe()
	// 	// TODO: check getCompanyData
	// 	this.form.patchValue({
	// 		suppliersCompanyInfo: {
	// 			companyName: data.companyName,
	// 			country: data.country,
	// 			website: data.website || '',
	// 			foundationYear: data.foundationYear,
	// 			businessType: data.businessType,
	// 			companyDescription: data.companyDescription,
	// 			contactPerson: this.userService.getUser().fullName,
	// 			email: data.email,
	// 		},
	// 	});
	// };

	// private getCompanyData(): Observable<any> {
	// 	return this.tradeBidService.getCompanyData().pipe(filter(data => !!data));
	// }

	private updateCompanyInfo(form: FormGroup): Observable<any> {
		const companyInfo = form.value.suppliersCompanyInfo;
		const newCompanyInfo = {
			companyName: companyInfo.companyName,
			country: companyInfo.country,
			email: companyInfo.email,
			number: companyInfo.phone.number,
			phone: companyInfo.phone.countryCode,
			businessType: companyInfo.businessType,
			companyDescription: companyInfo.companyDescription,
			contactPerson: companyInfo.contactPerson,
			website: companyInfo.website,
			yearOfFoundation: companyInfo.foundationYear,
		};
		return this.tradeBidService.updateCompanyInfo(newCompanyInfo).pipe(filter((data) => !!data));
	}

	private startChat(rfqId: string, userId: string): void {
		this.socket.emit("start_chat", {
			typeRoom: "rfq",
			rfqId,
			userId,
		});
	}

	public getOffer(): Observable<any> {
		return this._activatedRoute.paramMap.pipe(
			tap(() => {
				this.form.reset(this.createSuppliersCompanyInfo().value);
			}),
			map((paramMap) => {
				return paramMap.get("id");
			}),
			filter((id) => !!id),
			switchMap((id) => this.tradebidService.getRfqById(id))
		);
	}

	private updateForm(data): void {
		this.form.patchValue({
			quotationForm: {
				productName: data?.productName,
				specifications: data?.specification,
				productionYear: data?.year,
				unit: data?.unitMeasure,
				price: {
					price: data?.budget,
					tradeTerms: data?.tradeTerms,
				},
				// moreInformation: data?.moreInformation,
				photos: data?.photos,
			},
			// suppliersCompanyInfo: {
			// 	companyName: data.contact?.companyName,
			// 	email: data.contact?.email,
			// 	contactPerson: data.contact?.contactPerson,
			// 	phone: data?.contact?.phone,
			// 	website: data.contact?.website,
			// 	foundationYear: data.contact?.yearOfFoundation,
			// 	country: data.contact?.country,
			// 	businessType: data.contact?.businessType,
			// 	companyDescription: data.contact?.companyDescription,
			// 	whatsapp: data.contact?.availabilityMessengers.whatsapp,
			// 	telegram: data.contact?.availabilityMessengers.telegram
			// }
		});
	}

	ngOnDestroy(): void {
		this.socket.disconnect();
		localStorage.removeItem("showCancelButton");
	}
}
