import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "apps/site/src/app/auth/services/auth/auth.service";
import { Observable } from "rxjs";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { TranslocoService } from "@ngneat/transloco";

@Component({
	selector: "b2b-auth-join-us",
	templateUrl: "./auth-join-us.component.html",
	styleUrls: ["./auth-join-us.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthJoinUsComponent {
	public readonly roles$: Observable<any>;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;

	constructor(
		private readonly _authService: AuthService,
		private readonly _router: Router,
		private readonly _activatedRoute: ActivatedRoute,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		public readonly _translocoService: TranslocoService
	) {
		this.roles$ = this.getRoles();
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	}

	public getRoles() {
		return this._authService.getRoles().pipe(
			map((roles) =>
				roles.map((role) => ({
					...role,
					description: this._translocoService.translate(`ROLES.${role.name.toUpperCase()}`),
					displayName: this._translocoService.translate(`ROLES.${role.name.toUpperCase()}_NAME`),
				}))
			)
		);
	}

	public async updateRole(role) {
		await this._router.navigate([this.b2bNgxLinkService.getStaticLink("/auth/register-credentials")], {
			queryParams: {
				...this._activatedRoute.snapshot.queryParams,
				role: role._id,
			},
		});
	}
}
