import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
	selector: "b2b-client-google-complete",
	templateUrl: "./client-google-complete.component.html",
	styleUrls: ["./client-google-complete.component.scss"],
})
export class ClientGoogleCompleteComponent {
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	constructor(private readonly _router: Router) {
	}

	goToHome() {
		this._router.navigate(["/"]);
	}

	goToMarket() {
		this._router.navigate(["/b2bmarket"]);
	}
}
