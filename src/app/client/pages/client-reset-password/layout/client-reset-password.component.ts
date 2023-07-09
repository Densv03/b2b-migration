import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { HotToastService } from "@ngneat/hot-toast";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { TranslocoService } from "@ngneat/transloco";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { B2bNgxLinkService } from "libs/ngx-link/src";
import { ApiService } from "../../../../core/services/api/api.service";

export function password(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}
		if (control.value.length <= 8) {
			return { password: true };
		}

		return null;
	};
}

@UntilDestroy()
@Component({
	selector: "b2b-client-reset-password",
	templateUrl: "./client-reset-password.component.html",
	styleUrls: ["./client-reset-password.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientResetPasswordComponent implements OnInit {
	public readonly b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public readonly formControl: FormControl = new FormControl("", [Validators.required, password()]);

	public token = "";

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _apiService: ApiService,
		private readonly _hotToastrService: HotToastService,
		private readonly _changeDetectorRef: ChangeDetectorRef,
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _router: Router,
		private readonly _translocoService: TranslocoService,
		public readonly b2bNgxLinkService: B2bNgxLinkService
	) {}

	public sendMessage(formControl: FormControl) {
		this.formControl.markAsTouched();

		if (formControl.invalid) {
			return;
		}

		const data = {
			newPassword: formControl.value,
		};

		this._apiService
			.post(`auth/resetPassword/${this.token}`, data)
			.pipe(
				untilDestroyed(this),
				this._hotToastrService.observe({
					loading: this._translocoService.translate("TOASTR.LOADING"),
					success: this._translocoService.translate("TOASTR.SUCCESS"),
					error: this._translocoService.translate("AUTH.INVALID_EMAIL_ADDRESS"),
				})
			)
			.subscribe(
				() => {
					this._changeDetectorRef.detectChanges();
					this._router.navigateByUrl(this.b2bNgxLinkService.getStaticLink("/auth/log-in"));
				},
				(err) => {
					this._changeDetectorRef.detectChanges();
					this.formControl.setErrors({ [err.error.code]: true });
				}
			);
	}

	ngOnInit() {
		this._activatedRoute.paramMap.pipe(untilDestroyed(this)).subscribe((paramMap) => {
			this.token = paramMap.get("id");
		});
	}
}
