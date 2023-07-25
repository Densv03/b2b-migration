import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TranslocoService} from "@ngneat/transloco";
@Injectable({
	providedIn: 'root'
})
export class LanguageGuard implements CanActivate {
	constructor(private router: Router,
							private translocoService: TranslocoService
	) {
	}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let currentUrl = state.url;
		const urlArr = currentUrl.split('/');
		const availableLangs = ["es", "fr", "hi", "pt", "tr", "ar"];
		if (currentUrl.includes('/market-promo' || '/market-promotion') && availableLangs.includes(urlArr[urlArr.length - 1])) {
			return true;
		} else {
			if (urlArr.length > 2) {
				urlArr.pop();
				currentUrl = urlArr.join('/');
				this.router.navigate([currentUrl]);
			}
			this.translocoService.setActiveLang('en');
			return true;
		}
	}
}
