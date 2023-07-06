import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { catchError, map, switchMap } from "rxjs/operators";
import { ApiService } from "../../../../core/services/api/api.service";
import { of } from "rxjs";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@UntilDestroy()
@Component({
	selector: "b2b-client-email-confirmation",
	templateUrl: "./client-email-confirmation.component.html",
	styleUrls: ["./client-email-confirmation.component.scss"],
})
export class ClientEmailConfirmationComponent implements OnInit {
	isAccountActivated: boolean;

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _router: Router,
		private readonly _apiService: ApiService,
		public readonly b2bNgxLinkService: B2bNgxLinkService
	) {}

	ngOnInit() {
		this._activatedRoute.paramMap
			.pipe(
				untilDestroyed(this),
				map((paramMap) => paramMap.get("id")),
				switchMap((id) => this._apiService.get(`email/verify/${id}`)),
				catchError(() => {
					this.isAccountActivated = true;
					return of();
				})
			)
			.subscribe(async (res) => {
				await this._router.navigateByUrl(this.b2bNgxLinkService.getStaticLink(`/registration-complete`));
			});
	}
}
