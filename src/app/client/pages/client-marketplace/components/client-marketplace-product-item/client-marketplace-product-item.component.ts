import { Component, Input, OnInit } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";
import { getName } from "country-list";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { UserService } from "../../../client-profile/services/user/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { io } from "socket.io-client";
import { environment } from "../../../../../../environments/environment";
import { Observable, of } from "rxjs";
import { AuthService } from "../../../../../auth/services/auth/auth.service";
import { map } from "rxjs/operators";

const URLS_WITHOUT_CHATS = ["supplier-listing", "products"];

@Component({
	selector: "b2b-client-marketplace-product-item",
	templateUrl: "./client-marketplace-product-item.component.html",
	styleUrls: ["./client-marketplace-product-item.component.scss"],
})
export class ClientMarketplaceProductItemComponent implements OnInit {
	@Input() product: any;
	@Input() logoLink: string;
	public chatPossibilityIsHidden: boolean = false;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly user;

	private _socket: any;
	private token: string = "";

	constructor(
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly userService: UserService,
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly authService: AuthService
	) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.user = this.userService.getUser();
	}

	public ngOnInit(): void {
		this.userService.getToken$().subscribe((token) => {
			this.token = token;
		});

		this.checkCardForOpenChatPossibility();
	}


	public getCompanyLogo(): string {
		if(this.logoLink) {
			return this.logoLink;
		} else if (this.product.company[0] && this.product.company[0].logo) {
			return this.product.company[0].logo.path;
		}
		return 'plug';
	}

	public cutString(title: string, maxSymbolsAmount: number): string {
		return title?.length > maxSymbolsAmount ? `${title.slice(0, maxSymbolsAmount)}...` : title;
	}

	public getCountryName(countryCode: string): string {
		if (!countryCode) {
			return "";
		}
		return getName(countryCode);
	}

	public goTo(link: string) {
		this.router.navigate([link]);
	}

	public openChat(event: MouseEvent): void {
		event.stopPropagation();
		if (!this.user) {
			this.router.navigate(["/auth/log-in"]);
			return;
		}

		if (this.product.user === this.user?._id) {
			this.goTo("/b2bmarket/products/" + this.product._id);
			return;
		}

		this.openConnection(this.token);
		this._socket.emit("start_chat", {
			userId: this.product.user,
			productId: this.product._id,
			typeRoom: "product",
		});

		this._socket.on("chat_info", (data) => {
			this.goTo("profile/your-workspace/b2bmarket/chat/" + data._id);
		});
	}

	private checkCardForOpenChatPossibility(): void {
		URLS_WITHOUT_CHATS.forEach((url) => {
			if (this.router.url.includes(url)) {
				this.chatPossibilityIsHidden = true;
			}
		});
	}

	private openConnection(token): void {
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

	public getIdForContactSupplierButton$(): Observable<string> {
		if (this.product.user === this.user?._id) {
			return of("");
		}

		return this.authService.user$.pipe(
			map((user) => {
				return user ? "market-contact-supplier-authorized" : "market-contact-supplier-unauthorized";
			})
		);
	}
}
