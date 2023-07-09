import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { Router } from "@angular/router";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { DialogService } from "@ngneat/dialog";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslocoService } from "@ngneat/transloco";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { OffersService } from "apps/site/src/app/client/services/offers/offers.service";
import { Observable, Subject } from "rxjs";
import { tap, switchMap, startWith, filter } from "rxjs/operators";
import { ClientProfileMyOfferDeleteComponent } from "../components/client-profile-my-offer-delete/client-profile-my-offer-delete.component";
import { ClientProfileMyOfferMarkAsSoldComponent } from "../components/client-profile-my-offer-mark-as-sold/client-profile-my-offer-mark-as-sold.component";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";

function generateQueryString(obj, initialValue: string = "?") {
	return Object.entries(obj)
		.filter(([, value]: any) => !!value)
		.reduce((queryString: string, [key, value]: any) => {
			return Array.isArray(value)
				? `${queryString}${value.reduce((str, arrayItem) => `${str}${key}=${arrayItem}&`, "")}`
				: `${queryString}${key}=${value}&`;
		}, initialValue);
}

@UntilDestroy()
@Component({
	selector: "b2b-client-profile-my-offers",
	templateUrl: "./client-profile-my-offers.component.html",
	styleUrls: ["./client-profile-my-offers.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProfileMyOffersComponent {
	public readonly offers$: Observable<any>;
	public readonly offersSkeletonOptions: any[];
	public menuOptions: any[];
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public readonly forceUpdateSubject = new Subject();
	public readonly forceUpdate$ = this.forceUpdateSubject.asObservable();
	public loading: boolean;
	public isLangLoaded: boolean;

	constructor(
		private readonly _offersService: OffersService,
		private readonly _router: Router,
		private readonly _translocoService: TranslocoService,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly _dialogService: DialogService,
		private readonly _hotToastService: HotToastService
	) {
		const isLangAlreadyLoaded = this._translocoService.translate("OFFERS.MARK_AS_SOLD") !== "OFFERS.MARK_AS_SOLD";
		if (isLangAlreadyLoaded) {
			this.isLangLoaded = isLangAlreadyLoaded;
			this.menuOptions = this.getMenuOptions();
		}
		this.offers$ = this.forceUpdate$.pipe(
			startWith(isLangAlreadyLoaded),
			switchMap(() => this.getOffers())
		);
		this.offersSkeletonOptions = this.getOffersSkeletonOptions();
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;

		this._translocoService.events$.pipe(filter((e) => e.type === "translationLoadSuccess")).subscribe((e) => {
			this.isLangLoaded = true;
			this.menuOptions = this.getMenuOptions();
		});
	}

	public getOffers() {
		this.loading = true;
		return this._offersService.getMyOffers().pipe(
			tap((val) => {
				this.loading = false;
			})
		);
	}

	public getMenuOptions() {
		return [
			{
				label: this._translocoService.translate("OFFERS.MARK_AS_SOLD"),
				icon: "check",
				onClick: (offer) => {
					this.markAsSold(offer._id);
					// this._offersService.markAsSold(offer._id);
				},
			},
			{
				label: this._translocoService.translate("OFFERS.EDIT"),
				icon: "edit",
				onClick: (offer) => {
					this._router.navigateByUrl(this.b2bNgxLinkService.getStaticLink(`/profile/my-offers/${offer._id}`));
				},
			},
			{
				label: this._translocoService.translate("OFFERS.HIDE"),
				icon: "eye",
				onClick: (offer) => {
					this._offersService
						.hideOffer(offer._id)
						.pipe(untilDestroyed(this))
						.subscribe(() => {
							this.forceUpdateSubject.next(true);
						});
				},
			},
			{
				label: this._translocoService.translate("OFFERS.UNHIDE"),
				icon: "eye",
				onClick: (offer) => {
					if (offer.userTypeWhoHideOffer === "admin") {
						this._hotToastService.error(
							"Sorry, your offer was hidden by the administration of the site, please write to Contact Us",
							{
								dismissible: true,
							}
						);
						return;
					}
					this._offersService
						.unHideOffer(offer._id)
						.pipe(untilDestroyed(this))
						.subscribe(() => {
							this.forceUpdateSubject.next(true);
						});
				},
			},
			{
				label: this._translocoService.translate("OFFERS.DELETE"),
				icon: "delete-red",
				onClick: (offer) => {
					this.deleteOffer(offer._id);
					// this._offersService.deleteOfferById(offer._id);
				},
			},
		];
	}

	public markAsSold(id: string) {
		this._dialogService
			.open(ClientProfileMyOfferMarkAsSoldComponent, {
				data: {
					id,
				},
				width: "40vw",
				height: "auto",
				minHeight: "0",
				windowClass: "report-dialog",
			})
			.afterClosed$.pipe(untilDestroyed(this))
			.subscribe(() => {
				this.forceUpdateSubject.next(true);
			});
	}

	public deleteOffer(id: string) {
		this._dialogService
			.open(ClientProfileMyOfferDeleteComponent, {
				data: {
					id,
				},
				width: "40vw",
				height: "auto",
				minHeight: "0",
				windowClass: "report-dialog",
			})
			.afterClosed$.pipe(untilDestroyed(this))
			.subscribe(() => {
				this.forceUpdateSubject.next(true);
			});
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

	public goTo(link: string): void {
		this._router.navigate([link]);
	}
}