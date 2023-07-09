import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs/operators";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@UntilDestroy()
@Component({
	selector: "b2b-auth-confirm-email",
	templateUrl: "./auth-google.component.html",
	styleUrls: ["./auth-google.component.scss"],
})
export class AuthGoogleComponent implements OnInit {
	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _authService: AuthService,
		private readonly _router: Router,
		public readonly b2bNgxLinkService: B2bNgxLinkService
	) {}

	ngOnInit(): void {
		this._activatedRoute.paramMap
			.pipe(
				map((paramMap) => paramMap.get("id")),
				untilDestroyed(this)
			)
			.subscribe((id) => {
        if (id)
				  this._authService.updateToken(id);

				this._router.navigateByUrl(this.b2bNgxLinkService.getStaticLink("/"));
			});
	}
}
