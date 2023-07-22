import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { OffersService } from "../../../../client/services/offers/offers.service";
import { combineLatest, filter, mergeMap, Subject } from "rxjs";
import { map, startWith, switchMap, take } from "rxjs/operators";
import { B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { HotToastService } from "@ngneat/hot-toast";
import { ApiService } from "../../../../core/services/api/api.service";
import { AdminOfferChatsDialogComponent } from "../components/admin-offer-chats-dialog/admin-offer-chats-dialog.component";
import { AdminOfferDeclineDialogComponent } from "../components/admin-offer-decline-dialog/layout/admin-offer-decline-dialog.component";
import { io } from "socket.io-client";
import { environment} from "../../../../../environments/environment";
import { UserService } from "../../../../client/pages/client-profile/services/user/user.service";
import { ConfirmationDialogComponent} from "../../../../client/shared/components/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@UntilDestroy()
@Component({
	selector: "b2b-admin-offers",
	templateUrl: "./admin-offers.component.html",
	styleUrls: ["./admin-offers.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOffersComponent {
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;
	public readonly offers$: any;
	public readonly menuOptions: any;

	public readonly pageSubject = new Subject<number>();
	public readonly forceSubject = new Subject();

	public totalCount$: any;

	public _socket: any;
	public token: any;

	constructor(
		private readonly _offersService: OffersService,
		private readonly _hotToastrService: HotToastService,
		private readonly _apiService: ApiService,
		private readonly _usersService: UserService,
		private readonly dialog: MatDialog
	) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;

		this.offers$ = this._getOffers$();
		this.menuOptions = this._getMenuOptions();

		this.totalCount$ = this._offersService.getAllOffersCount();
		this._usersService
			.getToken$()
			.pipe(take(1))
			.subscribe((token: any) => {
				this.token = token;
				this.openConnection();
			});
	}

	export() {
		this._apiService.get("get-user-report").pipe(untilDestroyed(this)).subscribe();
	}

	public removeAllOffers() {
		this._offersService
			.removeAllOffers()
			.pipe(
				untilDestroyed(this),
				this._hotToastrService.observe({
					loading: "Offers is deleting...",
					success: "Offers successfully deleted",
					error: "Offers deleting failed",
				})
			)
			.subscribe();
	}

	private _getOffers$() {
		const page$ = this.pageSubject.asObservable().pipe(startWith(1));
		const force$ = this.forceSubject.asObservable().pipe(startWith(true));

		return combineLatest([page$, force$]).pipe(
			switchMap(([page]: any) => this._offersService.getOffers(`?offset=${(page - 1) * 10}`)),
			map((data: any) => data)
		);
	}

	public setPage(event: number) {
		this.pageSubject.next(event);
	}

	private _getMenuOptions() {
		return [
			{
				label: "Hide",
				icon: "eye",
				onClick: (offer: { _id: string; }) => {
					this._offersService
						.adminHideOffer(offer._id)
						.pipe(untilDestroyed(this))
						.subscribe(() => {
							this.forceSubject.next(true);
						});
				},
			},
			{
				label: "Unhide",
				icon: "eye",
				onClick: (offer: { _id: string; }) => {
					this._offersService
						.adminUnHideOffer(offer._id)
						.pipe(untilDestroyed(this))
						.subscribe(() => {
							this.forceSubject.next(true);
						});
				},
			},
			{
				label: "Chats",
				icon: "chat",
				onClick: (offer: { chatStarted: any; }) => {
					this.dialog.open(AdminOfferChatsDialogComponent, {
						data: {
							chatUsers: offer.chatStarted,
						},
						width: "40vw",
						height: "auto",
						minHeight: "0",
					});
				},
			},
			{
				label: "Delete",
				icon: "delete-red",
				onClick: (offer: { _id: string; }) => {
					this.dialog
						.open(ConfirmationDialogComponent, {
							data: {
								title: "Delete product",
								message: "Are you sure you want to delete this offer?",
								confirmButtonText: "Delete",
								confirmButtonTheme: B2bNgxButtonThemeEnum.BACKGROUND_RED,
								cancelButtonText: "Cancel",
								cancelButtonTheme: B2bNgxButtonThemeEnum.OUTLINE_BLACK,
							},
						})
						.afterClosed()
						.pipe(
							filter((data) => !!data),
							mergeMap(() => {
								return this._offersService.deleteOfferSub(offer._id).pipe(
									untilDestroyed(this),
									this._hotToastrService.observe({
										loading: "Offer deleting",
										success: "Offer deleted",
										error: "Offer deleting failed",
									})
								);
							})
						)
						.subscribe(() => {
							this.forceSubject.next(true);
						});
				},
			},
			{
				label: "approve by admin",
				icon: "check",
				onClick: (offer: { _id: string; }) => {
					this._offersService
						.approveOffer(offer._id)
						.pipe(untilDestroyed(this))
						.subscribe(() => {
							this.forceSubject.next(true);
							this._hotToastrService.success("approved");
						});
				},
			},
			{
				label: "decline by admin",
				icon: "cross",
				onClick: (offer: { user: any; _id: string; chatStarted: any; }) => {
					this.startChat(offer.user, offer._id);
					this.dialog
						.open(AdminOfferDeclineDialogComponent, {
							data: {
								chatUsers: offer.chatStarted,
							},
							width: "40vw",
							height: "auto",
							minHeight: "0",
						})
						.afterClosed().pipe(untilDestroyed(this))
						.subscribe(async (message: any) => {
							if (message) {
								// await this.openConnection();
								this._offersService
									.declineOffer(offer._id)
									.pipe(untilDestroyed(this))
									.subscribe(() => {
										this.sendMessage(offer.user, offer._id, message);
										this.closeConnection();
										this.forceSubject.next(true);
										this._hotToastrService.success("declined");
									});
							}
						});
				},
			},
		];
	}

	openConnection() {
		this._socket = io(environment.apiUrl, {
			path: "/chat",
			auth: {
				token: this.token,
			},
		});
	}

	startChat(userId: any, offerId: any) {
		this._socket.emit("start_chat", {
			userId,
			offerId,
		});
	}

	public sendMessage(userId: any, offerId: any, body: any) {
		if (!body) {
			return;
		}

		this._socket.emit("message", {
			type: "text",
			body,
			userId,
			offerId,
		});
	}

	closeConnection() {
		if (this._socket) {
			this._socket.disconnect();
		}
	}
}
