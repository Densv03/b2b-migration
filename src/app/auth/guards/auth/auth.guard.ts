import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from "@angular/router";

import { filter, map, tap } from "rxjs/operators";
import { HotToastService } from "@ngneat/hot-toast";
import { AuthGuardComponent } from "../../components/auth-guard/auth-guard.component";
import { B2bNgxLinkService } from "@b2b/ngx-link";
import {AuthService} from "../../services/auth/auth.service";

const messages: any = {
	"legal-help": "GUARDS.LEGAL_HELP",
	"offer": "GUARDS.ADD_OFFER",
	"offers": "GUARDS.VIEW_OFFERS",
	"latest-offers": "GUARDS.VIEW_OFFERS",
	"annual-payment": "GUARDS.ADD_PAYMENT_DETAILS",
};

const queryParams: any = {
	"annual-payment": "pricing",
	"latest-offers": "latest-offers",
	"legal-help": "legal-help",
};

@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	constructor(
		private readonly _authService: AuthService,
		private readonly _router: Router,
		private readonly _hotToastrService: HotToastService,
		private readonly _activatedRoute: ActivatedRoute,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		// public readonly _translocoService: TranslocoService,
		public readonly _hotToastService: HotToastService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this._authService.getUser().pipe(
			filter((user) => user !== undefined),
			tap((user) => {
				if (!user) {
					this._hotToastrService.show(AuthGuardComponent, {
						data: {
							type: messages[route.url[0].path],
						},
						style: {
							border: "2px solid #005dff",
							padding: "20px 15px",
						},
						autoClose: false,
						dismissible: true,
					});
					localStorage.removeItem("blocked-route");
					localStorage.setItem("blocked-route", state.url);

					this._router.navigate([this.b2bNgxLinkService.getStaticLink("/auth/log-in")], {
						queryParams: { from: queryParams[route.url[0].path] || "offer" },
					});
				}
			}),

			map((user) => {
				return !!user;
			})
		);
	}
}
