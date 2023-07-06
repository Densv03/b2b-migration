import {ChangeDetectorRef, Component} from "@angular/core";
import {AbstractControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import {B2bNgxLinkService, B2bNgxLinkThemeEnum} from "@b2b/ngx-link";
import {DialogService} from "@ngneat/dialog";
import {HotToastService} from "@ngneat/hot-toast";
import {FormBuilder, FormGroup} from "@ngneat/reactive-forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {AuthService} from "apps/site/src/app/auth/services/auth/auth.service";
import {AmplitudeService} from "apps/site/src/app/core/services/amplitude/amplitude.service";
// import {NgxSmartModalService} from "ngx-smart-modal";
import {of} from "rxjs";
import {catchError, skip} from "rxjs/operators";
import {AuthRecoverAccountComponent} from "../../auth-recover-account/auth-recover-account.component";
import {
	AuthResetPasswordModalComponent
} from "../components/auth-reset-password-modal/auth-reset-password-modal.component";
import {environment} from "../../../../../environments/environment";

@UntilDestroy()
@Component({
	selector: "b2b-auth-log-in",
	templateUrl: "./auth-log-in.component.html",
	styleUrls: ["./auth-log-in.component.scss"],
})
export class AuthLogInComponent {
	public readonly formGroup: FormGroup;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;
	public formState: { [key: string]: AbstractControl };

	constructor(
		private readonly authService: AuthService,
		private readonly formBuilder: FormBuilder,
		private readonly router: Router,
		private readonly changeDetectorRef: ChangeDetectorRef,
		private readonly _activatedRoute: ActivatedRoute,
		// private readonly _ngxSmartModalService: NgxSmartModalService,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly _ampService: AmplitudeService,
		private readonly _hotToastService: HotToastService,
		private readonly _dialogService: DialogService
	) {
		this.formGroup = this.getFormGroup();
		this.formState = this.formGroup.controls
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	}

	public get emailError() {
		const {errors, touched} = this.formGroup.getControl("email");

		if (!errors || !touched) {
			return "";
		}

		const errorCode = Object.keys(errors)[0];
		const errorMessages = {
			1000: "Email incorrect",
		};
		return errorMessages[errorCode] ?? "";
	}

	public get passwordError() {
		const {errors, touched} = this.formGroup.getControl("password");

		if (!errors || !touched) {
			return "";
		}

		const errorCode = Object.keys(errors)[0];
		const errorMessages = {
			1001: "Password incorrect",
		};
		return errorMessages[errorCode] ?? "";
	}

	getFormGroup() {
		return this.formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]],
		});
	}

	openResetPasswordModal() {
		this._dialogService.open(AuthResetPasswordModalComponent)

		this.formGroup.markAsUntouched();
	}

	public logInWithForm(formGroup) {
		if (formGroup.invalid) {
			return;
		}

		let isRecovered = false;
		try {
			this.authService
				.logInWithForm(formGroup.value)
				.pipe(
					catchError((er) => {
						if (er.error.code === 1016) {
							this._hotToastService.show("You have more than two sessions from the same account. Please login again.", {
								dismissible: true,
								style: {
									border: "1px solid #E63D3D",
								},
								autoClose: true,
							});
						} else {
							const errorType = er.error.code === 1000 ? "Incorrect email" : "Incorrect password";
							this._ampService.logEvent("Login Fail", {type: errorType});
							this._hotToastService.show("Incorrect email or password", {
								dismissible: true,
								style: {
									border: "1px solid #E63D3D",
								},
								autoClose: true,
							});
						}
						return of(null);
					})
				)
				.subscribe((res: any) => {
					isRecovered = !!res.message;
				});

			const {from} = this._activatedRoute.snapshot.queryParams;

			const url = from ? `/${from}` : "/";

			this.authService
				.getUser()
				.pipe(untilDestroyed(this), skip(1))
				.subscribe(async (val) => {
					this._ampService.logEvent("Login success", {type: "main app"});
					isRecovered && this.showDialog();
					// TODO: remove code below when tradeBid will be implemented and uncomment code above
					if (localStorage.getItem("blocked-route")?.includes("tradebid")) {
						await this.router.navigateByUrl("/");
					} else {
						await this.router.navigateByUrl("/");
						// await this.router.navigateByUrl(localStorage.getItem("blocked-route") || "/");
					}
				});
		} catch (err) {
			this.changeDetectorRef.detectChanges();
		}
	}

	public showDialog(): void {
		this._dialogService
			.open(AuthRecoverAccountComponent, {
				width: "40vw",
				height: "auto",
				minHeight: "0",
				windowClass: "report-dialog",
			})
			.afterClosed$.pipe(untilDestroyed(this))
			.subscribe();
	}

	registrationLink() {
		this._ampService.logEvent("Click Registration button", {source: localStorage.getItem("source")});
	}

	logInWithGoogle() {
		// this.authService.logInWithGoogle();

		document.location.href = `${environment.apiUrl}auth/google`;
	}

	logInWithLinkedIn() {
		document.location.href = `${environment.apiUrl}auth/linkedin`;
	}
}
