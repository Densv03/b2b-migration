import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";
import {catchError, filter, first, map, tap} from "rxjs/operators";
import { AuthService } from "../../services/auth/auth.service";
import { TranslocoService } from "@ngneat/transloco";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { FormBuilder, FormGroup } from "@ngneat/reactive-forms";
import { Validators } from "@angular/forms";
import { fullName } from "../../../core/helpers/validator/full-name";
import { onlyLatin } from "../../../core/helpers/validator/only-latin";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { animate, style, transition, trigger } from "@angular/animations";
import {ActivatedRoute, Router} from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { FirstStepDataModel } from "../auth-register-individual-account/shared/first-step-data.model";
import { BrowserStorageKeysEnum } from "../../../shared/enums/browser-storage-keys.enum";
import {onlyLatinAndNumberAndSymbols} from "../../../core/helpers/validator/only -latin-numbers-symbols";

@Component({
	selector: "b2b-auth-register-individual-account-second-step",
	templateUrl: "./auth-register-individual-account-second-step.component.html",
	styleUrls: ["./auth-register-individual-account-second-step.component.scss"],
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
export class AuthRegisterIndividualAccountSecondStepComponent implements OnInit {
	public form: FormGroup = this.getFormGroup();
	public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
	public b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public roles$ = this.getRoles();
	public availableRoles: any[] = [];
	private firstStepDataObj: FirstStepDataModel;
	constructor(
		private authService: AuthService,
		private translocoService: TranslocoService,
		private dialog: MatDialog,
		private fb: FormBuilder,
		public b2bNgxLinkService: B2bNgxLinkService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private hotToastrService: HotToastService,
		private changeDetectorRef: ChangeDetectorRef
	) {
		this.firstStepDataObj = JSON.parse(localStorage.getItem(BrowserStorageKeysEnum.FIRST_STEP_DATA));
	}

	ngOnInit() {
		if (this.firstStepDataObj?.companyName !== undefined && this.firstStepDataObj?.companyName !== null) {
			this.form.get("company").setValue(this.firstStepDataObj.companyName);
		}
	}

	public getRoles() {
		return this.authService.getRoles().pipe(
			map((roles) =>
				roles.map((role) => {
					const roleName = this.translocoService.translate(`ROLES.${role.name.toUpperCase()}_NAME`);

					return {
						...role,
						description: this.translocoService.translate(`ROLES.${role.name.toUpperCase()}`),
						displayName: roleName.charAt(0).toUpperCase() + roleName.slice(1),
					};
				})
			),
			tap((roles) => (this.availableRoles = roles)),
			map((roles) => [roles[2], roles[3], roles[1], roles[0]])
		);
	}

	public async registerWithForm(formGroup: FormGroup) {
		if (formGroup.invalid) {
			return;
		}

		const { email, password } = this.firstStepDataObj;

		const body: any = { email, password, ...formGroup.value, preferences: formGroup.value.categories };

		if (localStorage.getItem('ref')) {
			body.refId = localStorage.getItem('ref')
		}


		try {
			this.authService
				.registerWithForm({ ...body, passwordConfirm: password, password, email })
				.pipe(
					catchError((er) => {
						this.hotToastrService.show(
							`This email ${formGroup.get("securityData").get("email").value} is already registered.`,
							{
								dismissible: true,
								style: {
									border: "1px solid #E63D3D",
								},
								autoClose: false,
							}
						);
						return throwError(er);
					})
				)
				.subscribe(async (val) => {
					this.authService.updateToken(val.token);
					this.authService.initUser();
					await this.router.navigateByUrl(`/email-verify?email=${email}`);
				});
		} catch (err) {
			const { code } = err.error;
			if (code === 1002) {
				// this.form.get('securityData').get('email').setErrors({ 1002: true });
				this.changeDetectorRef.detectChanges();
			}
		}
	}

	private getFormGroup(): FormGroup {
		return this.fb.group({
			company: ["", [onlyLatinAndNumberAndSymbols(), Validators.required]],
			fullName: ["", [Validators.required, fullName(), onlyLatin()]],
			phone: ["", [Validators.required]],
			termsAndConditions: [null, Validators.required],
			categories: [[], Validators.required],
			roleId: [null, Validators.required],
			country: [null, Validators.required],
			preferences: [[]],
		});
	}

}
