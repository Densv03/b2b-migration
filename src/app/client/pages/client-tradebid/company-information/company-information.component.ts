import {Component, OnInit} from "@angular/core";
import {B2bNgxLinkThemeEnum} from "@b2b/ngx-link";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import {B2bNgxSelectThemeEnum} from "@b2b/ngx-select";
import {Observable, of} from "rxjs";
import {HotToastService} from "@ngneat/hot-toast";
import {TradebidService} from "../tradebid.service";
import {filter, first, map} from "rxjs/operators";
import {onlyLatinAndNumberAndSymbols} from "../../../../core/helpers/validator/only -latin-numbers-symbols";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../auth/services/auth/auth.service";
import {UserService} from "../../client-profile/services/user/user.service";
import {User} from "../../../../core/models/user/user.model";
import {ApiService} from "../../../../core/services/api/api.service";
import {siteLink} from "../../../../core/helpers/validator/site-link";
import {animate, style, transition, trigger} from "@angular/animations";
// import {B2bAuthRoleInterface} from "../../../../../../../../lib/shared/interfaces/src/lib/b2b-auth-role.interface";

interface SelectItem {
	id: string;
	value: string;
}

@Component({
	selector: "b2b-company-information",
	templateUrl: "./company-information.component.html",
	styleUrls: ["./company-information.component.scss"],
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
export class CompanyInformationComponent implements OnInit {
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public readonly b2bNgxSelectThemeEnum: typeof B2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;

	public businessType$: Observable<SelectItem[]>;
	public foundationYear$: Observable<SelectItem[]>;
	public employeesNumber$: Observable<SelectItem[]>;
	public annualRevenue$: Observable<SelectItem[]>;
	public position$: Observable<SelectItem[]>;
	public form: FormGroup;
	public initialCompanyData: any = null;
	public formType: "add-rfq" | "quotation" | "unclaimed-cargo" | "b2bmarket";
	public navigationUrl!: string;
	public formState: { [key: string]: AbstractControl };
	public userRole: string = "";

	private businessTypesArr: string[] = ["Trader", "Manufacturer", "Logistic company", "Broker"];
	public employeesNumberArr: string[] = ["1-5", "5-10", "10-50", "50-100", "> 100"];
	public annualRevenueArr: string[] = ["1-5M", "5-10M", "10-50M", "50-100M"];
	public positions: string[] = [
		"Purchase manager",
		"Office manager",
		"Sales manager",
		" FEA Manager",
		" CEO ",
		"Company owner",
	];
	public avaliableRoles!: Array<{ id: string; name: string }>;

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private authService: AuthService,
		private router: Router,
		private hotToastService: HotToastService,
		private tradebidService: TradebidService,
		private userService: UserService,
		private apiService: ApiService
	) {
		this.getRoles();
		this.form = this.createCompanyInformationGroup();
		this.formState = this.form.controls;
		this.tradebidService
			.getCompanyData()
			.pipe(
				first(),
				map((res) => {
					this.initialCompanyData = res;
					this.patchValueToForm(this.initialCompanyData);
				})
			)
			.subscribe();

		this.businessType$ = this.getObservableForSelect(this.businessTypesArr);
		this.foundationYear$ = this.getFoundationYear();
		this.position$ = this.getObservableForSelect(this.positions);
		this.employeesNumber$ = this.getObservableForSelect(this.employeesNumberArr);
		this.annualRevenue$ = this.getObservableForSelect(this.annualRevenueArr);
		this.formType = this.route.snapshot.queryParams["url"];
		this.getNavigationLink();

		this.userRole = this.userService.getUser().role.name;
	}

	ngOnInit(): void {
		localStorage.setItem("showCancelButton", "true");
	}

	public getRoles() {
		return this.authService
			.getRoles()
			.pipe(
				filter((res) => !!res),
				map((roles) => roles.map((role) => ({id: role._id, name: role.displayName}))),
				map((res) => (this.avaliableRoles = res))
			)
			.subscribe();
	}

	public getNavigationLink(): void {
		if (this.formType === "quotation") {
			this.navigationUrl = `tradebid/quotation/${localStorage.getItem("quotationId")}`;
			localStorage.removeItem("quotationId");
		} else if (this.formType === "add-rfq") {
			this.navigationUrl = "tradebid/add-rfq";
		} else if (this.formType === "b2bmarket") {
			this.navigationUrl = "b2bmarket/product";
		} else {
			this.navigationUrl = "offer";
		}
	}

	public onSave() {
		this.form.markAllAsTouched();
		if (this.form.status === "INVALID") {
			return;
		}
		const companyInfo: any = {
			...this.form.value,
			phone: this.form.value.phone.number,
			countryCode: this.form.value.phone.countryCode,
			yearOfFoundation: this.form.value.foundationYear,
		};

		if (!companyInfo.businessType) {
			companyInfo.businessType = undefined;
		}

		this.tradebidService
			.updateCompanyInfo(companyInfo)
			.pipe(
				first(),
				this.hotToastService.observe({
					loading: "Updating company information...",
					success: "Company information successfully updated.",
					error: "Company information updating failed",
				})
			)
			.subscribe({
				complete: () => {
					this.apiService.get("user/")
            .subscribe((data: any) => {
						const fullName = data.fullName;
						const preferences = data.preferences;
						const roleId =
							this.userService.getUser().role.name === "admin"
								? this.userService.getUser().role._id
								: this.avaliableRoles.find(
									(role) => role.name.toLowerCase() === this.form.value.businessType.toLowerCase()
								)?.id;
						const phone = data.phone;
						this.userService
							.updateUserSettings({
								roleId,
								fullName,
								preferences,
								phoneNumber: phone.number,
								phoneInternationalNumber: phone.internationalNumber,
								phoneNationalNumber: phone.nationalNumber,
								phoneCountryCode: phone.countryCode,
								phoneDialCode: phone.dialCode,
								phoneE164Number: phone.e164Number,
							})
							.subscribe();
					});

					this.router.navigate([this.navigationUrl]);
				},
			});
	}

	private createCompanyInformationGroup(): FormGroup {
		return this.fb.group({
			companyName: ["", [Validators.required]],
			businessType: ["", [Validators.required]],
			country: ["", [Validators.required]],
			foundationYear: ["", [Validators.required]],
			employeesNumber: ["", [Validators.required]],
			annualRevenue: ["", [Validators.required]],
			phone: ["", [Validators.required]],
			address: ["", [Validators.required]],
			website: ["", [siteLink()]],
			companyDescription: ["", [
				Validators.required,
				Validators.minLength(20),
				Validators.maxLength(500)]
			],
			position: ["", [Validators.required]],
		});
	}

	private patchValueToForm(res: any): void {
		const role =
			this.avaliableRoles.filter((role) => role.id === res?.businessType).map((role) => role.name)[0] ||
			res?.businessType;
		this.form.patchValue({
			companyName: res?.companyName,
			foundationYear: res?.yearOfFoundation,
			website: res?.website,
			country: res?.country,
			address: res?.address,
			position: res?.position,
			businessType: role,
			companyDescription: res?.companyDescription,
			phone: res?.phone,
			employeesNumber: res?.employeesNumber,
			annualRevenue: res?.annualRevenue,
		});
	}

	private getObservableForSelect(arr: string[]): Observable<SelectItem[]> {
		return of(
			arr.map((el) => {
				return {
					id: el,
					value: el,
				};
			})
		);
	}

	private getFoundationYear(): Observable<SelectItem[]> {
		const yearsArr: string[] = [];
		const currentYear: number = new Date(Date.now()).getFullYear();
		for (let i = currentYear; i > currentYear - 50; i--) yearsArr.push(i.toString());
		return this.getObservableForSelect(yearsArr);
	}
}
