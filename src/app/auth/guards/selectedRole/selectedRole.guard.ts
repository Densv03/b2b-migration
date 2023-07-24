import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { B2bNgxLinkService } from '@b2b/ngx-link';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SelectedRoleGuard implements CanActivate {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    public readonly b2bNgxLinkService: B2bNgxLinkService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const role = route.queryParams.role;
    if (!role) {
      await this._router.navigate(
        [this.b2bNgxLinkService.getStaticLink('/auth/register-credentials')],
        route.queryParams
      );
    }

    return !!role;
  }
}
