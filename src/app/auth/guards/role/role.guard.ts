import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { B2bNgxLinkService } from "@b2b/ngx-link";
import { AuthService } from "apps/site/src/app/auth/services/auth/auth.service";
import { filter, map, tap } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class RoleGuard implements CanActivate {
	constructor(
		private readonly _authService: AuthService,
		private readonly _router: Router,
		public readonly b2bNgxLinkService: B2bNgxLinkService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const token = this._authService.getToken();

		if (!token) {
			this._router.navigateByUrl(this.b2bNgxLinkService.getStaticLink("/"));
			return false;
		}

		return this._authService.getUser().pipe(
			filter((user) => !!user),
			map((user) => {
				const isAdmin = user?.role?.name === "admin";

				if (!isAdmin) {
					this._router.navigateByUrl(this.b2bNgxLinkService.getStaticLink("/"));
				}

				return isAdmin;
			})
		);
	}
}
