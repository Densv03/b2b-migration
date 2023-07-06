import { Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
	selector: "b2b-auth-recover-account",
	templateUrl: "./auth-recover-account.component.html",
	styleUrls: ["./auth-recover-account.component.scss"],
})
export class AuthRecoverAccountComponent {}
