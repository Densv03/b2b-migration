import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { B2bNgxLinkService } from "@b2b/ngx-link";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslocoService } from "@ngneat/transloco";
import { AuthService } from "apps/site/src/app/auth/services/auth/auth.service";
import { map, filter } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class DefaultRoleGuard implements CanActivate {
	constructor(
		private readonly _authService: AuthService,
		private readonly _router: Router,
		private readonly _hotToastrService: HotToastService,
		private readonly _activatedRoute: ActivatedRoute,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		public readonly _translocoService: TranslocoService,
		public readonly _hotToastService: HotToastService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this._authService.getUser().pipe(
			filter((user) => user !== undefined),
			map((user) => {
				if (state.url?.includes("auth/register")) {
					return true;
				}
				const isDefaultRole = user?.role?.name === "default";
				if (user && isDefaultRole) {
					this._router.navigate(["/auth/register", { registerStep: 0 }]);
					this._hotToastService.warning("Please choose account type");
				}

				return true;
			})
		);
	}
}
