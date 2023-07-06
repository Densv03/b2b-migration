import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";
import {HotToastService} from "@ngneat/hot-toast";

@Injectable({
	providedIn: 'root'
})
export class BuyerGuard implements CanActivate {

	constructor(private readonly authService: AuthService,
							private readonly hotToastrService: HotToastService
	) {
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | boolean {


		return this.authService.user$.pipe(map(user => this.showPopUp(user?.rootRole.name)));
	}

	private showPopUp(rootRole: string): boolean {
		if (rootRole !== 'supplier') {
			this.hotToastrService.info('Only supplier can reach this page.',
				{
					autoClose: false,
					dismissible: true,
				})
		}

		return rootRole === 'supplier';
	}
}
