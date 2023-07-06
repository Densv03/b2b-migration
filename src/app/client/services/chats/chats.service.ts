import { Injectable } from "@angular/core";
import { TranslocoService } from "@ngneat/transloco";
import { ApiService } from "apps/site/src/app/core/services/api/api.service";
import { BehaviorSubject, combineLatest, Observable, of, toArray } from "rxjs";
import { map, startWith, switchMap, tap } from "rxjs/operators";
import { io } from "socket.io-client";
import { environment } from "../../../../environments/environment";
import { AuthService } from "../../../auth/services/auth/auth.service";
import { SocketService } from "../socket/socket.service";

@Injectable({
	providedIn: "root",
})
export class ChatsService {
	public readonly _chatsBehaviourSubject: BehaviorSubject<any>;
	public readonly _chats$: Observable<any>;
	public readonly _endpoint: string;

	public readonly updateChatsByUser: BehaviorSubject<any>;
	public readonly updateChats$: Observable<any>;

	private _socket: any;
	constructor(
		private readonly _apiService: ApiService,
		private readonly _socketService: SocketService,
		public authService: AuthService,
		private readonly _translocoService: TranslocoService
	) {
		this._chatsBehaviourSubject = new BehaviorSubject<any>([]);
		this._chats$ = this._chatsBehaviourSubject.asObservable();

		this._endpoint = "chats";

		this.updateChatsByUser = new BehaviorSubject(true);
		this.updateChats$ = this.updateChatsByUser.asObservable();
	}

	public requestContacts(chat) {
		this.openConnection(this.authService.getToken());

		return this._apiService.post(`request/contacts/${chat._id}`, {}).pipe(
			tap(() => {
				this._socket.emit("message", {
					type: "text",
					body: `Buyer requested contacts`,
					userId: chat.seller._id,
					offerId: chat.offer._id,
				});

				this.closeConnection();
			})
		);
	}

	openConnection(token) {
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

	closeConnection() {
		if (this._socket) {
			this._socket.disconnect();
		}
	}

	public sendContacts(offer, userId) {
		this.openConnection(this.authService.getToken());

		const body = `Seller sent contact details for you\n\nCompany name: ${offer.contact.companyName}\nContact person: ${offer.contact.personName}\nPhone number: ${offer.contact.phone?.e164Number}\nEmail: ${offer.contact.email}\n`;

		this._socket.emit("message", {
			type: "text",
			body,
			userId,
			offerId: offer._id,
		});
	}

	public openContacts(offer, userId) {
		this.openConnection(this.authService.getToken());

		return this._apiService.post(`offer/${offer._id}/open/${userId}`, {}).pipe(
			tap(() => {
				const body = `Seller opened product info for you\n\nCompany name: ${offer.contact.companyName}\nContact person: ${offer.contact.personName}\nPhone number: ${offer.contact.phone?.e164Number}\nEmail: ${offer.contact.email}\n`;

				this._socket.emit("message", {
					type: "text",
					body,
					userId,
					offerId: offer._id,
				});
			})
		);
	}

	public closeContacts(offerId, userId) {
		this.openConnection(this.authService.getToken());

		return this._apiService.post(`offer/${offerId}/close/${userId}`, {}).pipe(
			tap(() => {
				this._socket.emit("message", {
					type: "text",
					body: `Seller have been decline you contacts request`,
					userId,
					offerId,
				});

				this.closeConnection();
			})
		);
	}

	private chats$(): Observable<any> {
		return this._apiService.get("my/chats").pipe(
			toArray(),
			map((data: any) => data[0].chats)
		);
	}

	public getChatsByUser() {
		const status$ = this._socketService.status$.pipe(startWith(null));
		const newMessage$ = this._socketService.newMessage$.pipe(startWith(null));
		const user$ = this.authService.getUser();

		let unreadMessagesCount = 0;

		return this.updateChats$.pipe(
			switchMap(() => combineLatest([status$, newMessage$, this.chats$(), user$])),
			map(([status, newMessage, myChats, user]: any) => {
				const modifiedChats = myChats.map((myChat) => {
					const iAm =
						myChat.buyer?._id === user._id
							? this._translocoService.translate("CHAT.BUYER")
							: this._translocoService.translate("CHAT.SELLER");
					const isSeller = myChat.lastMessage.author === myChat.seller?._id;

					const displayInfo = isSeller ? { ...myChat.offer.contact } : { ...myChat.buyer };
					const author =
						displayInfo?.fullName ||
						displayInfo?.personName ||
						`${
							isSeller
								? this._translocoService.translate("CHAT.SELLER")
								: this._translocoService.translate("CHAT.BUYER")
						} of ${myChat.offer?.title || "Deleted Offer"}`;

					return {
						...myChat,
						iAm,
						lastMessage: {
							...myChat.lastMessage,
							author: isSeller ? myChat.seller : myChat.buyer,
							displayInfo: { ...displayInfo, author },
						},
					};
				});
				const newMessageIndex = modifiedChats.findIndex((modifiedChat) => modifiedChat._id === newMessage?.room);

				if (newMessageIndex !== -1) {
					const isSeller = newMessage.author === modifiedChats[newMessageIndex].seller?._id;
					const displayInfo = isSeller
						? { ...modifiedChats[newMessageIndex].offer.contact }
						: { ...modifiedChats[newMessageIndex].buyer };
					const author =
						displayInfo?.fullName ||
						displayInfo?.personName ||
						`${
							isSeller
								? this._translocoService.translate("CHAT.SELLER")
								: this._translocoService.translate("CHAT.BUYER")
						} of ${modifiedChats[newMessageIndex].offer?.title}`;

					modifiedChats[newMessageIndex].lastMessage = {
						...newMessage,
						author: isSeller ? modifiedChats[newMessageIndex].seller : modifiedChats[newMessageIndex].buyer,
						displayInfo: { ...displayInfo, author },
					};

					if (!unreadMessagesCount) {
						unreadMessagesCount = modifiedChats[newMessageIndex].unreadMessagesCount;
					}

					modifiedChats[newMessageIndex].unreadMessagesCount = ++unreadMessagesCount;
				}

				const statusIndex = modifiedChats.findIndex(
					(modifiedChat) => modifiedChat.lastMessage.author?._id === status?.user
				);

				if (statusIndex !== -1 && modifiedChats[statusIndex].lastMessage.author) {
					modifiedChats[statusIndex].lastMessage.author.online = status?.online;
				}

				return modifiedChats;
			})
		);
	}

	public getChatsByOffer(offerId: string) {
		const status$ = this._socketService.status$.pipe(startWith(null));
		const newMessage$ = this._socketService.newMessage$.pipe(startWith(null));

		let unreadMessagesCount = 0;

		return combineLatest([status$, newMessage$, this._apiService.get(`offer/${offerId}/chats`)]).pipe(
			map(([status, newMessage, myChats]: any) => {
				const modifiedChats = myChats.map((myChat) => {
					const isSeller = myChat.lastMessage.author === myChat.seller?._id;
					const displayInfo = isSeller ? { ...myChat.offer.contact } : { ...myChat.buyer };
					const author =
						displayInfo?.fullName ||
						displayInfo?.personName ||
						`${
							isSeller
								? this._translocoService.translate("CHAT.SELLER")
								: this._translocoService.translate("CHAT.BUYER")
						} of ${myChat.offer?.title}`;
					return {
						...myChat,
						iAm: this._translocoService.translate("CHAT.SELLER"),
						lastMessage: {
							...myChat.lastMessage,
							author: isSeller ? myChat.seller : myChat.buyer,
							displayInfo: { ...displayInfo, author },
						},
					};
				});
				const newMessageIndex = modifiedChats.findIndex((modifiedChat) => modifiedChat._id === newMessage?.room);

				if (newMessageIndex !== -1) {
					const isSeller = newMessage.author === modifiedChats[newMessageIndex].seller?._id;
					const displayInfo = isSeller
						? { ...modifiedChats[newMessageIndex].offer.contact }
						: { ...modifiedChats[newMessageIndex].buyer };
					const author =
						displayInfo?.fullName ||
						displayInfo?.personName ||
						`${
							isSeller
								? this._translocoService.translate("CHAT.SELLER")
								: this._translocoService.translate("CHAT.BUYER")
						} of ${modifiedChats[newMessageIndex].offer?.title}`;

					modifiedChats[newMessageIndex].lastMessage = {
						...newMessage,
						author: isSeller ? modifiedChats[newMessageIndex].seller : modifiedChats[newMessageIndex].buyer,
						displayInfo: { ...displayInfo, author },
					};

					if (!unreadMessagesCount) {
						unreadMessagesCount = modifiedChats[newMessageIndex].unreadMessagesCount;
					}

					modifiedChats[newMessageIndex].unreadMessagesCount = ++unreadMessagesCount;
				}

				const statusIndex = modifiedChats.findIndex(
					(modifiedChat) => modifiedChat.lastMessage.author?._id === status?.user
				);

				if (statusIndex !== -1) {
					modifiedChats[statusIndex].lastMessage.author.online = status.online;
				}

				return modifiedChats;
			})
		);
	}

	public getChatById(id) {
		const chats = this._chatsBehaviourSubject.getValue();
		const foundChat = chats.find((chatToFind) => chatToFind.id === id);

		if (foundChat) {
			return of(foundChat);
		}

		return this._apiService.get(`my/chat/${id}`);
	}

	public getChats(): Observable<any> {
		const chats = this._chatsBehaviourSubject.getValue();

		if (!chats.length) {
			this._apiService.get("chats").subscribe((chats: any) => {
				this._chatsBehaviourSubject.next(chats);
			});
		}

		return this._chats$;
	}

	public removeChatById(id: string) {
		return this._apiService.delete(`room/${id}/delete`).pipe(
			tap(() => {
				this.updateChatsByUser.next(true);
			})
		);
	}
}
