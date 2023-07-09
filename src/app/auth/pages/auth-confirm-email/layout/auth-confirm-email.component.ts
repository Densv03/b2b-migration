import { Component, OnInit } from "@angular/core";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";

@Component({
	selector: "b2b-auth-confirm-email",
	templateUrl: "./auth-confirm-email.component.html",
	styleUrls: ["./auth-confirm-email.component.scss"],
})
export class AuthConfirmEmailComponent {
  protected readonly B2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
}
