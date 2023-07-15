import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {TradebidService} from "../../../client-tradebid/tradebid.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
// @ts-ignore
import {getName} from "country-list";
import {PublicCompanyInfoModel} from "../../../../../core/models/public-company-info.model";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {UserService} from "../../../client-profile/services/user/user.service";
import {User} from "../../../../../core/models/user/user.model";
import {io} from "socket.io-client";
import {environment} from "../../../../../../environments/environment";
import {
  ClientMarketCompanyPagePhoneDialogComponent
} from "./components/client-market-company-page-phone-dialog/client-market-company-page-phone-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {websiteProtocolRegex} from "../../../../../core/helpers/validator/site-link";
import {AuthService} from "../../../../../auth/services/auth/auth.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {NgxSkeletonLoaderConfig} from "ngx-skeleton-loader/lib/ngx-skeleton-loader-config.types";

@UntilDestroy()
@Component({
	selector: "b2b-client-market-company-page",
	templateUrl: "./client-market-company-page.component.html",
	styleUrls: ["./client-market-company-page.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientMarketCompanyPageComponent implements OnInit {
	public companyInfo$: Observable<PublicCompanyInfoModel>;
	public user: User;
	public userIsAuth: boolean;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	private socket: any;
	private token: string;

	private isPhoneNumberVisible = false;
	private businessTypeSource: BehaviorSubject<string> = new BehaviorSubject<string>("");
	public businessType$: Observable<string> = this.businessTypeSource.asObservable();

	constructor(
		private readonly tradebidService: TradebidService,
		private readonly userService: UserService,
		private readonly route: ActivatedRoute,
		private dialog: MatDialog,
		private readonly router: Router,
		private readonly authService: AuthService
	) {
		this.user = this.userService.getUser();
		this.userIsAuth = this.userService.isAuth();
		this.companyInfo$ = this.tradebidService.getCompanyInfoById(this.route.snapshot.params['id']);
	}

	public ngOnInit() {
		this.userService
			.getToken$()
			.pipe(untilDestroyed(this))
			.subscribe((token) => {
				this.token = token;
				this.openConnection(this.token);
			});

		this.updateBusinessType();
	}

	public checkCompanySiteForValid(site: string): string {
		if (!site) return '';
		if (!site.match(websiteProtocolRegex)) {
			return site.replace(site, "https://" + site);
		}
		return site;
	}

	public openPhoneModal(companyInfo: PublicCompanyInfoModel): void {
		const { number, dialCode } = companyInfo.phone;
		this.dialog
			.open(ClientMarketCompanyPagePhoneDialogComponent, {
				data: {
					dialCode: dialCode,
					phoneNumber: number,
					user: companyInfo.user,
					isPhoneVisible: this.isPhoneNumberVisible,
				},
			})
			.afterClosed()
			.subscribe((data) => {
				this.isPhoneNumberVisible = data;
			});
	}

	public getCountryName(countryCode: string): string {
		if (!countryCode) {
			return "";
		}
		return getName(countryCode);
	}

	public getSkeletonOptions(): Partial<NgxSkeletonLoaderConfig> {
    return {
      count: 10,
      animation: 'progress',
      theme: {
        height: window.innerHeight / 3
      }
    };
	}

	public goTo(link: string): void {
		this.router.navigate([link]);
	}

	public openChat(event: MouseEvent, userId: string): void {
		event.stopPropagation();

		if (!this.userIsAuth) {
			this.router.navigate(["/auth/log-in"]);
		} else {
			this.openConnection(this.token);
			this.socket.emit("start_users_chat", {
				userId,
				typeRoom: "users",
			});

			this.socket.on("users_chat_info", (data: any) => {
				this.goTo("profile/your-workspace/b2bmarket/chat/" + data._id);
			});
		}
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

	private updateBusinessType(): void {
		combineLatest([this.companyInfo$, this.authService.getRoles()])
			.pipe(untilDestroyed(this))
			.subscribe(([companyInfo, roles]) => {
				const foundRoleById = roles.find((role: any) => role._id === companyInfo.businessType);
				if (foundRoleById) {
					this.businessTypeSource.next(foundRoleById?.displayName);
				} else {
					this.businessTypeSource.next(companyInfo.businessType);
				}
        return;
			});
	}
}
