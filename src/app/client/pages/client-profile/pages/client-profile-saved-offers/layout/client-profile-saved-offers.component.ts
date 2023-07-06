import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { HotToastService } from "@ngneat/hot-toast";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import {OffersService} from "../../../../../services/offers/offers.service";

@UntilDestroy()
@Component({
	selector: "b2b-client-profile-saved-offers",
	templateUrl: "./client-profile-saved-offers.component.html",
	styleUrls: ["./client-profile-saved-offers.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProfileSavedOffersComponent {
	public readonly offers$: Observable<any>;
	public readonly offersSkeletonOptions: any[];
	public readonly menuOptions: any[];
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;

	public loading: boolean;

	constructor(
		private readonly _hotToastService: HotToastService,
		private readonly _offersService: OffersService,
		private readonly _router: Router,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		// private readonly _translocoService: TranslocoService
	) {
		this.offers$ = this.getSavedOffers();
		this.offersSkeletonOptions = this.getOffersSkeletonOptions();
		this.menuOptions = this.getMenuOptions();
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	}

	public getSavedOffers() {
		this.loading = true;

		return this._offersService.getSavedOffers().pipe(
			tap(() => {
				this.loading = false;
			})
		);
	}

	public getMenuOptions() {
		return [
			{
				label: "Remove from saved",
				icon: "delete-red",
				onClick: (info: any) => {
					this._offersService
						.removeFavoriteOffer(info._id)
						.pipe(
							untilDestroyed(this),
							// this._hotToastService.observe({
							// 	loading: this._translocoService.translate("TOASTR.LOADING"),
							// 	success: this._translocoService.translate("TOASTR.SUCCESS"),
							// 	error: this._translocoService.translate("TOASTR.ERROR"),
							// })
						)
						.subscribe((respone) => {});
				},
			},
		];
	}

	public getOffersSkeletonOptions() {
		return [
			{
				count: 10,
				animation: "progress",
				theme: {
					height: "76px",
				},
			},
		];
	}
}
