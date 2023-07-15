import { Component } from "@angular/core";
import {FormControl, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { HotToastService } from "@ngneat/hot-toast";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { UserService } from "../../services/user/user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../../../auth/services/auth/auth.service";

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
		public matDialogRef: MatDialogRef<ClientProfileDeleteAccountComponent>,
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
		this.matDialogRef.close();
	}

	public deleteOffer(ev: { preventDefault: () => void; stopImmediatePropagation: () => void; }): void {
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
				this.matDialogRef.close();
				this._authService.logOut();
				this._hotToastService.error("Your account has been deleted");
				this._router.navigateByUrl("/");
			});
	}
}
