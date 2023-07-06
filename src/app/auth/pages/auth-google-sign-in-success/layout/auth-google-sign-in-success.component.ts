import { animate, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogService } from "@ngneat/dialog";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AuthService } from "../../../services/auth/auth.service";
import { AuthRecoverAccountComponent } from "../../auth-recover-account/auth-recover-account.component";

@UntilDestroy()
@Component({
	selector: "b2b-auth-google-sign-in-success",
	templateUrl: "./auth-google-sign-in-success.component.html",
	styleUrls: ["./auth-google-sign-in-success.component.scss"],
	animations: [
		trigger("fadeInOut", [
			transition(":enter", [style({ opacity: 0 }), animate(500, style({ opacity: 1 }))]),
			transition(":leave", [animate(500, style({ opacity: 0 }))]),
		]),
	],
})
export class AuthGoogleSignInSuccessComponent {
	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _authService: AuthService,
		private readonly _router: Router,
		private readonly _dialogService: DialogService
	) {
		this._activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
			const { token, recovered } = params;
			this._authService.updateToken(token);
			this._authService.initUser();
			this._authService
				.getUser()
				.pipe(untilDestroyed(this))
				.subscribe((user) => {
					if (recovered) {
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
					this._authService.updateToken(token);
					this._authService.updateRole(user?.role);
					this._router.navigateByUrl("/");
				});
		});
	}
}
