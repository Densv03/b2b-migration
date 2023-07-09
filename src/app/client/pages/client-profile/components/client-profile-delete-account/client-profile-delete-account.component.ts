import { Component } from "@angular/core";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { DialogRef } from "@ngneat/dialog";
import { HotToastService } from "@ngneat/hot-toast";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AuthService } from "apps/site/src/app/auth/services/auth/auth.service";
import { UserService } from "../../services/user/user.service";

@UntilDestroy()
@Component({
	selector: "b2b-client-profile-delete-account",
	templateUrl: "./client-profile-delete-account.component.html",
	styleUrls: ["./client-profile-delete-account.component.scss"],
})
export class ClientProfileDeleteAccountComponent {
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	formControl: FormControl;
	otherReasonControl: FormControl;

	constructor(
		public ref: DialogRef,
		private readonly _userService: UserService,
		private readonly _hotToastService: HotToastService,
		private readonly _router: Router,
		private readonly _authService: AuthService
	) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.formControl = new FormControl();
		this.otherReasonControl = new FormControl("", Validators.required);
		this.formControl.valueChanges.subscribe();
	}

	public close(): void {
		this.ref.close();
	}

	public deleteOffer(ev): void {
		ev.preventDefault();
		ev.stopImmediatePropagation();
		if (this.formControl.value === "Other" && this.otherReasonControl.value === "") {
			this.otherReasonControl.markAllAsTouched();
			return;
		}
		const body = {
			reasonForDeleting: this.formControl.value === "Other" ? this.otherReasonControl.value : this.formControl.value,
		};

		this._userService
			.deleteUser({ body })
			.pipe(untilDestroyed(this))
			.subscribe(() => {
				this.ref.close();
				this._authService.logOut();
				this._hotToastService.error("Your account has been deleted");
				this._router.navigateByUrl("/");
			});
	}
}
