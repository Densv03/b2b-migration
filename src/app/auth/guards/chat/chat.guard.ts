import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from "@angular/router";
import { combineLatest } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { ChatsService } from "../../../client/services/chats/chats.service";
import { filter, map, tap } from "rxjs/operators";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Injectable({
	providedIn: "root",
})
export class ChatGuard implements CanActivate {
	constructor(
		private readonly _router: Router,
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _authService: AuthService,
		private readonly _chatsService: ChatsService,
		public readonly b2bNgxLinkService: B2bNgxLinkService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const user$ = this._authService.getUser();
		const chat$ = this._chatsService.getChatById(route.params['id']);

		return combineLatest([user$, chat$]).pipe(
			filter(([user, chat]) => !!user),
			map(([user, chat]: any) => user._id === chat.seller._id || user._id === chat.buyer._id),
			tap((access) => {
				if (!access) {
					this._router.navigateByUrl(this.b2bNgxLinkService.getStaticLink("/latest-offers"));
				}
			})
		);
	}
}
