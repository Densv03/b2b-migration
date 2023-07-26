import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
} from "@angular/core";
import { B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import { ActivatedRoute } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ChatService} from "../../../services/chat/chat.service";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import {filter, map, switchMap, take, tap} from "rxjs/operators";
import { UserService} from "../../client-profile/services/user/user.service";
import { OffersService} from "../../../services/offers/offers.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { io } from "socket.io-client";
import { AuthService } from "../../../../auth/services/auth/auth.service";
import { environment } from "../../../../../environments/environment";
import { SocketService } from "../../../services/socket/socket.service";
import { ChatsService } from "../../../services/chats/chats.service";
import { HotToastService } from "@ngneat/hot-toast";
import { B2bNgxLinkService } from "@b2b/ngx-link";
import { TranslocoService } from "@ngneat/transloco";
import {MixpanelService} from "../../../../core/services/mixpanel/mixpanel.service";
import mixpanel from "mixpanel-browser";

@UntilDestroy()
@Component({
	selector: "b2b-client-chat",
	templateUrl: "./client-chat.component.html",
	styleUrls: ["./client-chat.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientChatComponent implements OnInit, OnDestroy {
	@ViewChild("chatContainer") chatContainer: ElementRef;

	public readonly formGroup: FormGroup;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	public readonly messages$: Observable<any>;
	public readonly chatInfo$: Observable<any>;

	private readonly _messagesHistoryBehaviourSubject: BehaviorSubject<any>;
	private readonly _messagesHistory$: Observable<any>;

	private readonly _messageBehaviourSubject: BehaviorSubject<any>;
	private readonly _message$: Observable<any>;

	private readonly _chatInfoBehaviourSubject: BehaviorSubject<any>;
	private readonly _chatInfo$: Observable<any>;

	public chat: any;
	public displayRequestContacts: boolean;
	public displayOpenContacts: boolean;
	public displayCloseContacts: boolean;
	public displayContactsRequested: boolean;
	public displayContactsOpened: boolean;

	private _socket: any;

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _chatService: ChatService,
		private readonly _chatsService: ChatsService,
		private readonly _usersService: UserService,
		private readonly _offersService: OffersService,
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _socketService: SocketService,
		private readonly _hotToastService: HotToastService,
		public changeDetectorRef: ChangeDetectorRef,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly _translocoService: TranslocoService,
    private readonly mixpanelService: MixpanelService
	) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.formGroup = this._formBuilder.group({
			message: "",
		});

		this._messagesHistoryBehaviourSubject = new BehaviorSubject<any>([]);
		this._messagesHistory$ = this._messagesHistoryBehaviourSubject.asObservable();

		this._messageBehaviourSubject = new BehaviorSubject<any>([]);
		this._message$ = this._messageBehaviourSubject.asObservable();

		this._chatInfoBehaviourSubject = new BehaviorSubject<any>(null);
		this._chatInfo$ = this._chatInfoBehaviourSubject.asObservable();

		this.chatInfo$ = this.getChatInfo();
		this.messages$ = this.getMessages();
	}

	public getChatInfo() {
		return this._authService.getUser().pipe(
			filter((user) => !!user),
			switchMap((user) => {
				return this._chatInfo$.pipe(
					filter((chatInfo) => !!chatInfo),
					map((chatInfo) => {
						const dispayInfoOf =
							chatInfo.buyer?._id === user?._id
								? this._translocoService.translate("CHAT.SELLER")
								: this._translocoService.translate("CHAT.BUYER");
						const displayInfo =
							dispayInfoOf === this._translocoService.translate("CHAT.SELLER")
								? chatInfo.offer?.contact
								: chatInfo.buyer;
						const author =
							displayInfo?.fullName ||
							displayInfo?.personName ||
							`${this._translocoService.translate("CHAT.SELLER")} of ${chatInfo.offer?.title}`;

						return {
							...chatInfo,
							displayInfo: {
								...displayInfo,
								role: dispayInfoOf,
								author,
							},
						};
					})
				);
			})
		);
	}

	public getMessages() {
		const user$ = this._authService.getUser();
		const chat$ = this._activatedRoute.paramMap.pipe(
			map((paramMap) => paramMap.get("id")),
			switchMap((id) => this._chatService.getChatById(id))
		);

		return combineLatest([user$, chat$]).pipe(
			filter(([user, chat]) => !!user && !!chat),
			switchMap(([user, chat]) =>
				this._messagesHistory$.pipe(
					tap(() => {
						setTimeout(() => {
							this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
						}, 0);
					}),
					map((messages) =>
						messages.map((message: any) => {
							const dispayInfoOf =
								chat.seller?._id === message?.author
									? this._translocoService.translate("CHAT.SELLER")
									: this._translocoService.translate("CHAT.BUYER");
							const displayInfo =
								dispayInfoOf === this._translocoService.translate("CHAT.SELLER") ? chat.offer?.contact : chat.buyer;
							const author =
								displayInfo?.fullName ||
								displayInfo?.personName ||
								`${this._translocoService.translate("CHAT.SELLER")} of ${chat.offer?.title}`;

							return {
								...message,
								contact: {
									...displayInfo,
									author,
									role: displayInfo,
								},
							};
						})
					)
				)
			)
		);
	}

	public enterPressed(event: Event) {
		this.sendMessage(this.formGroup.get("message").value);
		event.preventDefault();
	}

	public async sendMessage(body: string) {
		if (!body) {
			return;
		}

		this.chatInfo$.pipe(untilDestroyed(this)).subscribe((chatInfo) => {
			const user = this._usersService.getUser();
			this._socket.emit("message", {
				type: "text",
				body,
				userId: user._id === chatInfo.buyer?._id ? chatInfo.seller._id : chatInfo.buyer?._id,
				offerId: chatInfo.offer._id,
			});
		});

		this.formGroup.get("message").reset();
	}

	public subscribeOnMessage() {
		return this._socket.on("message", (message: any) => {
			const history = this._messagesHistoryBehaviourSubject.getValue();
			this._messagesHistoryBehaviourSubject.next([...history, message]);
		});
	}

	public subscribeOnChatInfo() {
		return this._socket.on("chat_info", (chatInfo: any) => {
			this._socketService.readMessages(chatInfo.unreadMessagesCount);
			this._chatInfoBehaviourSubject.next(chatInfo);
		});
	}

	public subscribeOnMessageHistory() {
		return this._socket.on("message_history", (message_history: any) => {
			this._messagesHistoryBehaviourSubject.next(message_history);
		});
	}

	openConnection(token: string) {
		if (this._socket) {
			this._socket.disconnect();
		}

		this._socket = io(environment.apiUrl, {
			path: "/chat",
			auth: {
				token,
			},
		});
	}

	ngOnInit() {
		const token$ = this._usersService.getToken$();
		const user$ = this._usersService.getUser$();
		const chat$ = this._activatedRoute.paramMap.pipe(
			map((paramMap) => paramMap.get("id")),
			switchMap((id) => this._chatService.getChatById(id))
		);

		combineLatest([chat$, token$, user$])
			.pipe(untilDestroyed(this))
			.subscribe(([chat, token, user]: any) => {
				const buyer = Array.isArray(chat.buyer) ? chat.buyer[0] : chat.buyer;
				const seller = Array.isArray(chat.seller) ? chat.seller[0] : chat.seller;

				// if (!buyer || !seller) {
				// }

				this.openConnection(token);

				this.subscribeOnMessageHistory();
				this.subscribeOnChatInfo();
				this.subscribeOnMessage();

				const role = user._id === buyer?._id ? "buyer" : "seller";
				const contactTo = role === "seller" ? buyer : seller;

				this.displayContactsOpened = chat.offer.openedFor.includes(buyer._id);

				this.displayContactsRequested = chat.contactsRequested && !this.displayContactsOpened;
				this.displayRequestContacts =
					role === "buyer" &&
					!this.displayContactsOpened &&
					!this.displayContactsRequested &&
					(!chat.offer.visibility.email || !chat.offer.visibility.phone);
				// Object.values(chat.offer.visibility).some((visibility) => !visibility);
				this.displayOpenContacts = role === "seller" && !this.displayContactsOpened && chat.contactsRequested;
				this.displayCloseContacts = role === "seller" && !this.displayContactsOpened && chat.contactsRequested;

				this.chat = chat;

				this._socket.emit("start_chat", {
					userId: contactTo?._id,
					offerId: chat.offer?._id,
				});

        this.getMessages()
          .pipe(take(1))
          .subscribe((messages) => {
            const filteredMessages = messages.filter((message: any) => message.author !== user._id);
            if (filteredMessages.length === 1) {
              const currentDate = new Date();
              const dateSent = new Date(chat.createdAt);
              const day = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
              const received = day < 0 ? '1st Day' : `${day}st Day`;
              const trackLabel = role === 'seller' ? 'New Request received'
                : 'Request Response';
              this.mixpanelService.track(trackLabel, {
                'Product category': chat.offer.category,
                'First Request received': received,
                'Supplier\'s country ': chat.seller.country,
                'Subject': 'UC',
                'Buyer\'s country': chat.buyer.country
              })
              mixpanel.people.set({'Average Response Time': Date()})
            }
          })
			});
	}


	requestContacts() {
		this._chatsService
			.requestContacts(this.chat)
			.pipe(
				untilDestroyed(this),
				this._hotToastService.observe({
					loading: "Contacts requesting...",
					success: "Contacts requested successfully!",
					error: "Contacts requesting failed!",
				})
			)
			.subscribe(() => {
				this.displayContactsRequested = false;
				this.displayRequestContacts = false;
				this.changeDetectorRef.detectChanges();
			});
	}

	openContacts() {
		this._chatsService.sendContacts(this.chat.offer, this.chat.buyer._id);
		// this._hotToastService.success("Contacts sent successfully!");

		this._chatsService
			.openContacts(this.chat.offer, this.chat.buyer._id)
			.pipe(
				untilDestroyed(this),
				this._hotToastService.observe({
					loading: "Contacts opening...",
					success: "Contacts opened successfully!",
					error: "Contacts opening failed!",
				})
			)
			.subscribe(() => {
				this.displayOpenContacts = false;
				this.displayCloseContacts = true;
				this.displayContactsOpened = true;
				this.displayContactsRequested = false;
				this.changeDetectorRef.detectChanges();
			});
	}

	closeContacts() {
		this._chatsService
			.closeContacts(this.chat.offer._id, this.chat.buyer._id)
			.pipe(
				untilDestroyed(this),
				this._hotToastService.observe({
					loading: "Contacts closing...",
					success: "Contacts closed successfully!",
					error: "Contacts closing failed!",
				})
			)
			.subscribe(() => {
				this.displayOpenContacts = false;
				this.displayCloseContacts = false;
				this.displayContactsOpened = false;
				this.displayContactsRequested = false;
				this.changeDetectorRef.detectChanges();
			});
	}

	ngOnDestroy() {
		if (this._socket) {
			this._socket.disconnect();
		}
	}
}
