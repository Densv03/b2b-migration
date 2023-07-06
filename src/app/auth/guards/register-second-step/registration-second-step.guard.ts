import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../../../client/pages/client-profile/services/user/user.service";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class RegistrationSecondStepGuard implements CanActivate {
	constructor(private userService: UserService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return true;
		// return this.userService.getUser$().pipe(
		// 	map(user => {
		// 		if (!user) {
		// 			return true;
		// 		} else {
		// 			if (user.role.name.toLowerCase() === 'default') {
		// 				this.router.navigate(['/auth/register-individual-account/second-step']);
		// 			}
		// 		}
		// 		return true;
		// 	})
		// )
	}
}
