import { Component, OnInit } from "@angular/core";
import { AmplitudeService } from "apps/site/src/app/core/services/amplitude/amplitude.service";

@Component({
	selector: "b2b-auth-confirm-email",
	templateUrl: "./auth-confirm-email.component.html",
	styleUrls: ["./auth-confirm-email.component.scss"],
})
export class AuthConfirmEmailComponent {
	constructor(private readonly _ampService: AmplitudeService) {
		this._ampService.logEvent("View confirmation page");
	}
}
