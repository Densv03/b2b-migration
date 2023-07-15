import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { HotToastService } from "@ngneat/hot-toast";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../../../../../../auth/services/auth/auth.service";
import { TranslocoService } from "@ngneat/transloco";
import {ChatsService} from "../../../../../services/chats/chats.service";

@UntilDestroy()
@Component({
	selector: "b2b-client-profile-my-chats",
	templateUrl: "./client-profile-my-chats.component.html",
	styleUrls: ["./client-profile-my-chats.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProfileMyChatsComponent {
	public readonly chats$: Observable<any>;
	public readonly chatsSkeletonOptions: any;

	public readonly dropdownOptions: any;
	public readonly sellerOptions: any;
	public readonly buyerOptions: any;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;

	public loading: boolean;

	constructor(
		private readonly _hotToastService: HotToastService,
		private readonly _chatsService: ChatsService,
		private readonly _authService: AuthService,
		private readonly _router: Router,
		private readonly _translocoService: TranslocoService,
		public readonly b2bNgxLinkService: B2bNgxLinkService
	) {
		this.chats$ = this.getChats();
		this.chatsSkeletonOptions = this.getChatsSkeletonOptions();
		this.sellerOptions = this.getSellerOptions();
		this.buyerOptions = this.getBuyerOptions();

		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	}

	public getChats(): Observable<any> {
		this.loading = true;
		return this._chatsService.getChatsByUser().pipe(
			map((chats) => {
				return chats.map((chat: any) => ({
					...chat,
				}));
			}),
			tap(() => {
				this.loading = false;
			})
		);
	}

	public getChatsSkeletonOptions() {
		return [
			{
				count: 10,
				animation: "progress",
				theme: {
					height: "120px",
				},
			},
		];
	}

	public getBuyerOptions() {
		return [
			{
				label: this._translocoService.translate("OFFERS.REQUEST_CONTACTS"),
				icon: "user-2",
				onClick: (chat: any) => {
					this._chatsService
						.requestContacts(chat)
						.pipe(
							untilDestroyed(this),
							this._hotToastService.observe({
								loading: this._translocoService.translate("TOASTR.LOADING"),
								success: this._translocoService.translate("TOASTR.SUCCESS"),
								error: this._translocoService.translate("TOASTR.ERROR"),
							})
						)
						.subscribe();
				},
			},
			{
				label: this._translocoService.translate("OFFERS.DELETE"),
				icon: "delete-red",
				onClick: (chat: { _id: string; }) => {
					this._chatsService
						.removeChatById(chat._id)
						.pipe(
							untilDestroyed(this),
							this._hotToastService.observe({
								loading: this._translocoService.translate("TOASTR.LOADING"),
								success: this._translocoService.translate("TOASTR.SUCCESS"),
								error: this._translocoService.translate("TOASTR.ERROR"),
							})
						)
						.subscribe(() => {});
				},
			},
		];
	}

	public getSellerOptions() {
		return [
			{
				label: this._translocoService.translate("OFFERS.SEND_MY_CONTACTS"),
				icon: "card",
				onClick: async (chat: { offer: any; buyer: { _id: string; }; }) => {
					this._chatsService.sendContacts(chat.offer, chat.buyer?._id);

					this._hotToastService.success("Contacts sent successfully!");
				},
			},
			{
				label: this._translocoService.translate("OFFERS.UNHIDE_PRODUCT_INFO"),
				icon: "trainings",
				onClick: (chat: { offer: any; buyer: { _id: string; }; }) => {
					this._chatsService
						.openContacts(chat.offer, chat.buyer?._id)
						.pipe(
							untilDestroyed(this),
							this._hotToastService.observe({
								loading: this._translocoService.translate("TOASTR.LOADING"),
								success: this._translocoService.translate("TOASTR.SUCCESS"),
								error: this._translocoService.translate("TOASTR.ERROR"),
							})
						)
						.subscribe();
				},
			},
			{
				label: this._translocoService.translate("OFFERS.HIDE_PRODUCT_INFO"),
				icon: "card",
				onClick: (chat: { offer: { _id: string; }; buyer: { _id: string; }; }) => {
					this._chatsService
						.closeContacts(chat.offer?._id, chat.buyer?._id)
						.pipe(
							untilDestroyed(this),
							this._hotToastService.observe({
								loading: this._translocoService.translate("TOASTR.LOADING"),
								success: this._translocoService.translate("TOASTR.SUCCESS"),
								error: this._translocoService.translate("TOASTR.ERROR"),
							})
						)
						.subscribe();
				},
			},
			{
				label: this._translocoService.translate("OFFERS.DELETE"),
				icon: "delete-red",
				onClick: (chat: { _id: string; }) => {
					this._chatsService
						.removeChatById(chat._id)
						.pipe(
							untilDestroyed(this),
							this._hotToastService.observe({
								loading: this._translocoService.translate("TOASTR.LOADING"),
								success: this._translocoService.translate("TOASTR.SUCCESS"),
								error: this._translocoService.translate("TOASTR.ERROR"),
							})
						)
						.subscribe(() => {});
				},
			},
		];
	}
}
