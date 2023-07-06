import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class RedirectGuard implements CanActivate {
	constructor(private readonly _router: Router) {}
	canActivate() {
		if (window.location.href.includes("discount.")) {
			this._router.navigateByUrl("/");
			return true;
		}

		return true;
	}
}
