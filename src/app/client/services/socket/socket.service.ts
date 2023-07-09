import { Injectable } from "@angular/core";
// import { io } from "socket.io-client";
import { UserService } from "../../pages/client-profile/services/user/user.service";
import { environment } from "../../../../environments/environment";
import { combineLatest, filter } from "rxjs/operators";
import { BehaviorSubject, Subject } from "rxjs";
import { ApiService } from "../../../core/services/api/api.service";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class SocketService {
	private _socket: any;

	private readonly _newMessageSubject = new Subject();
	private readonly _newMessage$ = this._newMessageSubject.asObservable();

	private readonly _statusSubject = new Subject();
	private readonly _status$ = this._statusSubject.asObservable();

	private readonly _unreadMessagesCountBehaviourSubject = new BehaviorSubject(0);
	private readonly _unreadOfferMessagesCountBehaviourSubject = new BehaviorSubject(0);
	private readonly _unreadRfqMessagesCountBehaviourSubject = new BehaviorSubject(0);
	private readonly _unreadMarketplaceMessagesCountBehaviourSubject = new BehaviorSubject(0);
	private readonly _unreadMessagesCount$ = this._unreadMessagesCountBehaviourSubject.asObservable();
	private readonly _unreadOfferMessagesCount$ = this._unreadOfferMessagesCountBehaviourSubject.asObservable();
	private readonly _unreadRfqMessagesCount$ = this._unreadRfqMessagesCountBehaviourSubject.asObservable();
	private readonly _unreadMarketplaceMessagesCount$ =
		this._unreadMarketplaceMessagesCountBehaviourSubject.asObservable();

	constructor(
		private readonly _usersService: UserService,
		private readonly _apiService: ApiService,
		private readonly _router: Router,
	) {
		this.openConnection();
		this.getUnreadMessagesCount();
		this.getUnreadOfferMessagesCount();
		this.getUnreadRfqMessagesCount();
		this.getUnreadMarketplaceMessagesCount();
	}

	private getUnreadMessagesCount() {
		this._usersService
			.getToken$()
			.pipe(filter((token) => !!token))
			.subscribe(async () => {
				try {
					const {unreadMessagesCount} = await this._apiService.get<any>("my/unreadMessagesCount").toPromise();

					this._unreadMessagesCountBehaviourSubject.next(unreadMessagesCount);
				} catch {
				}
			});
	}

	private getUnreadOfferMessagesCount() {
		this._usersService
			.getToken$()
			.pipe(filter((token) => !!token))
			.subscribe(async () => {
				try {
					const {unreadMessagesCount} = await this._apiService.get<any>("my/unreadOfferMessagesCount").toPromise();
					this._unreadOfferMessagesCountBehaviourSubject.next(unreadMessagesCount);
				} catch {
				}
			});
	}

	private getUnreadRfqMessagesCount() {
		this._usersService
			.getToken$()
			.pipe(filter((token) => !!token))
			.subscribe(async () => {
				try {
					const {unreadMessagesCount} = await this._apiService.get<any>("my/unreadRfqMessagesCount").toPromise();
					this._unreadRfqMessagesCountBehaviourSubject.next(unreadMessagesCount);
				} catch {
				}
			});
	}

	private getUnreadMarketplaceMessagesCount(): void {
		this._usersService
			.getToken$()
			.pipe(
				filter((token) => !!token),
				combineLatest([this._apiService.get<any>("my/unreadUsersMessagesCount"), this._apiService.get<any>("my/unreadProductMessagesCount")])
			).subscribe((data) => {
			this._unreadMarketplaceMessagesCountBehaviourSubject.next(data[1].unreadMessagesCount + data[2].unreadMessagesCount);
		})
	}

	private openConnection() {
		this._usersService
			.getToken$()
			.pipe(filter((token) => !!token))
			.subscribe((token) => {
				if (this._socket) {
					this._socket.disconnect();
				}

				// this._socket = io(environment.apiUrl, {
				// 	path: "/app",
				// 	auth: {
				// 		token,
				// 	},
				// });

				// this.subscribeOnNewMessage();
				// this.subscribeOnStatusChange();
			});
	}

	private subscribeOnNewMessage() {
		return this._socket.on("new_message", (newMessage: any) => {
			if (this._router.url.includes(newMessage.room)) {
				return;
			}

			switch (newMessage.typeRoom) {
				case "rfq":
					this._unreadRfqMessagesCountBehaviourSubject.next(
						this._unreadRfqMessagesCountBehaviourSubject.getValue() + 1
					);
					break;
				case "product":
					this._unreadMarketplaceMessagesCountBehaviourSubject.next(
						this._unreadMarketplaceMessagesCountBehaviourSubject.getValue() + 1
					);
					break;
				case "offer":
					this._unreadOfferMessagesCountBehaviourSubject.next(
						this._unreadOfferMessagesCountBehaviourSubject.getValue() + 1
					);
					break;
			}

			this._newMessageSubject.next(newMessage);

			const unreadMessagesCount = this._unreadMessagesCountBehaviourSubject.getValue();


			this._unreadMessagesCountBehaviourSubject.next(unreadMessagesCount + 1);
		});
	}

	public get unreadMessagesCount$() {
		return this._unreadMessagesCount$;
	}

	public get unreadOfferMessagesCount$() {
		return this._unreadOfferMessagesCount$;
	}

	public get unreadRfqMessagesCount$() {
		return this._unreadRfqMessagesCount$;
	}

	public get unreadMarketplaceMessagesCount$() {
		return this._unreadMarketplaceMessagesCount$;
	}

	public readMessages(count: number) {
		const newCount = this._unreadMessagesCountBehaviourSubject.getValue() - count;
		this._unreadMessagesCountBehaviourSubject.next(newCount);
	}

	public get newMessage$() {
		return this._newMessage$;
	}

	private subscribeOnStatusChange() {
		this._socket.on("online", (user: any) => {
			this._statusSubject.next({online: true, user});
		});

		this._socket.on("offline", (user: any) => {
			this._statusSubject.next({online: false, user});
		});
	}

	public get status$() {
		return this._status$;
	}
}
