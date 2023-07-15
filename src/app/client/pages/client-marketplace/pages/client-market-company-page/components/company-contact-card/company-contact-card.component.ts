import { Component, Input, OnInit } from '@angular/core';
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { PublicCompanyInfoModel } from "../../../../../../../core/models/public-company-info.model";
// @ts-ignore
import { getName } from "country-list";
import { UserService } from "../../../../../client-profile/services/user/user.service";
import { User } from "../../../../../../../core/models/user/user.model";
import { Router } from "@angular/router";
import { io } from "socket.io-client";
import { environment } from "../../../../../../../../environments/environment";
import {websiteProtocolRegex} from "../../../../../../../core/helpers/validator/site-link";
import {MatDialog} from "@angular/material/dialog";
import {
	ClientMarketCompanyPagePhoneDialogComponent
} from "../client-market-company-page-phone-dialog/client-market-company-page-phone-dialog.component";

@Component({
  selector: 'b2b-company-contact-card',
  templateUrl: './company-contact-card.component.html',
  styleUrls: ['./company-contact-card.component.scss']
})
export class CompanyContactCardComponent implements OnInit {

	@Input() companyInfo: PublicCompanyInfoModel;

	public user: User;
	public userIsAuth: boolean;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	private socket: any;
	private token: string;
	private isPhoneNumberVisible = false;

  constructor(private readonly userService: UserService,
							private readonly router: Router,
							private readonly dialog: MatDialog) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.user = this.userService.getUser();
		this.userIsAuth = this.userService.isAuth();
	}

  ngOnInit(): void {
		this.userService.getToken$().subscribe((token) => {
			this.token = token;
			this.openConnection(this.token);
		});
  }

	public checkCompanySiteForValid(site: string): string {
		if (!site.match(websiteProtocolRegex)) {
			return site.replace(site, 'https://' + site);
		}
		return site;
	}

	public openChat(event: MouseEvent): void {
		event.stopPropagation();

		if (!this.userIsAuth) {
			this.router.navigate(["/auth/log-in"]);
		} else {
			this.openConnection(this.token);
			this.socket.emit("start_users_chat", {
				userId: this.companyInfo.user,
				typeRoom: "users",
			});

			this.socket.on("users_chat_info", (data: any) => {
				this.goTo("profile/your-workspace/b2bmarket/chat/" + data._id);
			});
		}
	}

	public goTo(link: string) {
		this.router.navigate([link]);
	}

	private openConnection(token: string): void {
		if (this.socket) {
			this.socket.disconnect();
		}

		this.socket = io(environment.apiUrl, {
			path: "/chat",
			auth: {
				token,
			},
		});
	}

	public getCountryName(countryCode: string): string {
		if (!countryCode) {
			return "";
		}
		return getName(countryCode);
	}

	public openPhoneModal(): void {
		const {number, dialCode} = this.companyInfo.phone;
		this.dialog.open(ClientMarketCompanyPagePhoneDialogComponent, {
			data: {
				dialCode: dialCode,
				phoneNumber: number,
				isPhoneVisible: this.isPhoneNumberVisible
			}
		})
			.afterClosed()
			.subscribe(data => {
				this.isPhoneNumberVisible = data;
			});
	}

}
