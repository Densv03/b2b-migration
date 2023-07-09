import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "apps/site/src/app/auth/services/auth/auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AmplitudeService } from "apps/site/src/app/core/services/amplitude/amplitude.service";
import { io } from "socket.io-client";
import { environment } from "apps/site/src/environments/environment.prod";
import { UserService } from "../services/user/user.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import {User} from "../../../../core/models/user/user.model";

interface SidenavOption {
	label: string;
	icon: string;
	onClick?: () => void;
	link?: string;
}

@UntilDestroy()
@Component({
	selector: "b2b-client-profile",
	templateUrl: "./client-profile.component.html",
	styleUrls: ["./client-profile.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProfileComponent implements OnInit, OnDestroy {
	public readonly sidenavAccountOptions: SidenavOption[];
	public readonly sidenavWorkspaceOptions: SidenavOption[];
	public readonly user$: Observable<User>;
	private _socket: any;

	constructor(
		public authService: AuthService,
		private readonly router: Router,
		private readonly _ampService: AmplitudeService,
		private readonly _userService: UserService
	) {
		this.user$ = this.authService.user$;
		this.sidenavAccountOptions = this.getAccountOptions();
		this.sidenavWorkspaceOptions = this.getWorkspaceOptions();
	}

	public ngOnInit() {
		this.openConnection();
	}

	public openConnection() {
		this._userService
			.getToken$()
			.pipe(untilDestroyed(this))
			.subscribe((token) => {
				this._socket = io(environment.apiUrl, {
					path: "/app",
					auth: {
						token,
					},
				});
			});
	}

	public ngOnDestroy() {
		if (this._socket) {
			this._socket.disconnect();
		}
	}

	private async logOut() {
		// this._ampService.logEvent("Logout success");
		this._socket.emit("logout");
		this.authService.logOut();
		await this.router.navigateByUrl("");
	}

	private getAccountOptions(): SidenavOption[] {
		return [
			{
				label: "Settings",
				icon: "sidenav-line",
				link: "/profile/your-account/settings",
			},
			{
				label: "Company information",
				icon: "sidenav-line",
				link: "/profile/your-account/company-information",
			},
			{
				label: "",
				icon: "",
				link: "",
			},
		];
	}
	private getWorkspaceOptions(): SidenavOption[] {
		return [
			{
				label: "B2B Market",
				link: "/profile/your-workspace/b2bmarket",
				icon: "sidenav-line",
			},
			{
				label: "Unclaimed cargo",
				link: "/profile/your-workspace/unclaimed-cargo",
				icon: "sidenav-line",
			},
			{
				label: "TradeBid",
				link: "/profile/your-workspace/tradebid",
				icon: "sidenav-line",
			},
			{
				label: "SIDENAV.LOG_OUT",
				onClick: () => this.logOut(),
				icon: "log-out",
			},
		];
	}
}
