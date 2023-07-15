import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { untilDestroyed } from "@ngneat/until-destroy";
import { HotToastService } from "@ngneat/hot-toast";
import { ChatsService } from "../../../../../../services/chats/chats.service";
import { TranslocoService } from "@ngneat/transloco";
import { UserService } from "../../../../services/user/user.service";
import { User } from "../../../../../../../core/models/user/user.model";

@Component({
	selector: "b2b-chats-item",
	templateUrl: "./chats-item.component.html",
	styleUrls: ["./chats-item.component.scss"],
})
export class ChatsItemComponent implements OnInit {
	@Input() chatsItem: any;
	@Input() chatType: "my-quotation" | "my-rfq" | "marketplace";
	@Output() deleteChat: EventEmitter<void> = new EventEmitter<void>();
	public chatRouterLInk: any;
	public dropdownItems: any;
	private user: User;

	private typeToRouterLink: any = {
		"my-quotation": "/profile/your-workspace/tradebid/my-quotation/chat",
		"my-rfq": "/profile/your-workspace/tradebid/my-rfq/chat",
		"marketplace": "/profile/your-workspace/b2bmarket/chat",
	};

	constructor(
		private readonly _hotToastService: HotToastService,
		private readonly _chatsService: ChatsService,
		private readonly _translocoService: TranslocoService,
		private readonly userService: UserService
	) {
		this.user = this.userService.getUser();
		this.dropdownItems = this.getDropdownItems();
	}
	ngOnInit(): void {
		this.chatRouterLInk = [this.typeToRouterLink[this.chatType], this.chatsItem._id];
	}

	get fullName(): string {

		if (this.user._id === this.chatsItem.buyer?._id) {
			return this.chatsItem.seller?.fullName;
		}
		return this.chatsItem.buyer?.fullName;
	}

	get activeStatus(): string {
		return this.chatsItem.activeStatus;
	}

	get profileDescription(): string {
		return this.chatsItem.offerTitle;
	}

	get unreadMessagesCount(): number {
		return this.chatsItem.unreadMessagesCount;
	}

	get productDescription(): string {
		const wordsArr = this.chatsItem.offerTitle?.split(' ').slice(0, 15);
		if (wordsArr && wordsArr.length > 15) {
			return  `${wordsArr.join()}...`
		} else if (wordsArr && wordsArr.length < 15) {
			return this.chatsItem.offerTitle
		}
		return ''
	}

	get productPhoto(): string {
		return this.chatsItem.rfq[0]?.photos[0] || "";
	}

	public getDropdownItems(): any {
		return [
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
						.subscribe(() => this.deleteChat.emit());
				},
			},
		];
	}
}
