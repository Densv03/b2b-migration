import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { FormGroup } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { environment } from "../../../../../environments/environment.prod";

@UntilDestroy()
@Component({
	selector: "b2b-client-account-not-registered",
	templateUrl: "./client-account-not-registered.component.html",
	styleUrls: ["./client-account-not-registered.component.scss"],
})
export class ClientAccountNotRegisteredComponent {
	public readonly formGroup: FormGroup;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;

	email: string;

	constructor(private readonly _router: Router, private _activatedRoute: ActivatedRoute) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;

		this._activatedRoute.queryParamMap.pipe(untilDestroyed(this)).subscribe((val: ParamMap) => {
			this.email = val.get("email");
		});
	}

	createNewAccount() {
		this._router.navigateByUrl("auth/register-credentials");
	}

	loginWithAnotherAccount() {
		this._router.navigateByUrl("auth/log-in");
	}
}
