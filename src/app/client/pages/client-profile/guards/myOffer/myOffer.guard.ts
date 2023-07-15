import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { B2bNgxLinkService } from "@b2b/ngx-link";
import { combineLatest } from "rxjs";
import { filter, map } from "rxjs/operators";
import { OffersService } from "../../../../services/offers/offers.service";
import {AuthService} from "../../../../../auth/services/auth/auth.service";

@Injectable({
	providedIn: "root",
})
export class MyOfferGuard implements CanActivate {
	constructor(
		private readonly _authService: AuthService,
		private readonly _offersService: OffersService,
		private readonly _router: Router,
		public readonly b2bNgxLinkService: B2bNgxLinkService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const offerId = route.paramMap.get("id");

		const user$ = this._authService.getUser().pipe(filter((user) => !!user));
		const offer$ = this._offersService.getOfferById(offerId);

		return combineLatest([user$, offer$]).pipe(
			map(([user, offer]) => {
				const isOwner = offer?.user === user._id;

				if (!isOwner) {
					this._router.navigateByUrl(this.b2bNgxLinkService.getStaticLink("/"));
				}

				return isOwner;
			})
		);
	}
}
