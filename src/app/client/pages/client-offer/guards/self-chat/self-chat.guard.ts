import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "apps/site/src/app/auth/services/auth/auth.service";
import { OffersService } from "../../../../services/offers/offers.service";
import { combineLatest } from "rxjs";
import { filter, map, skip, tap } from "rxjs/operators";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Injectable({
	providedIn: "root",
})
export class SelfChatGuard implements CanActivate {
	constructor(
		private readonly _authService: AuthService,
		private readonly _offersService: OffersService,
		private readonly _router: Router,
		public readonly b2bNgxLinkService: B2bNgxLinkService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const { id } = route.params;

		const offer$ = this._offersService.getOfferById(id);
		const user$ = this._authService.user$.pipe(filter((user) => !!user));

		return combineLatest([offer$, user$]).pipe(
			map(([offer, user]) => {
				const canActivate = offer.user !== user._id;

				if (!canActivate) {
					this._router.navigateByUrl(this.b2bNgxLinkService.getStaticLink(`/offers/${offer._id}`));
				}

				return canActivate;
			})
		);
	}
}
