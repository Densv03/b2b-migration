import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { B2bNgxLinkService } from "@b2b/ngx-link";
import { AuthService } from "../services/auth/auth.service";

@Component({
	selector: "b2b-auth",
	templateUrl: "./auth.component.html",
	styleUrls: ["./auth.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
	constructor(
		private readonly router: Router,
		private readonly authService: AuthService,
		public readonly b2bNgxLinkService: B2bNgxLinkService
	) {}

}
