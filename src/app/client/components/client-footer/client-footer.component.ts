import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import {User} from "../../../core/models/user/user.model";

@Component({
	selector: "b2b-client-footer",
	templateUrl: "./client-footer.component.html",
	styleUrls: ["./client-footer.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFooterComponent {
	@Input() public options: any[];
	@Input() public icons: any[];
	@Input() public socialMedias: any[];
	@Input() public user: User;

	public readonly currentYear = new Date(Date.now()).getFullYear()
	public readonly sidenavOptions: any[];
	public readonly subOptions: any[];
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;

	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {
		this.sidenavOptions = this.getSidenavOptions();
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
		this.subOptions = this.getSubOptions();
	}

	public getSubOptions() {
		return [
			{
				label: "SIDENAV.TERMS_AND_CONDITIONS",
				link: "/terms-and-conditions",
			},
			{
				label: "SIDENAV.PRIVACY_POLICY",
				link: "/privacy-policy",
			},
			{
				label: "SIDENAV.COOKIE_POLICY",
				link: "/cookie-policy",
			},
		];
	}

	public getSidenavOptions() {
		return [
			{
				label: "SIDENAV.MY_CHATS",
				link: "/profile/your-workspace/b2bmarket",
				icon: "chat",
			},
			{
				label: "SIDENAV.MY_OFFERS",
				link: "/profile/my-offers",
				icon: "price-tag",
			},
			{
				label: "SIDENAV.SAVED_OFFERS",
				link: "/profile/your-workspace/unclaimed-cargo",
				icon: "star",
			},
			{
				label: "SIDENAV.SETTINGS",
				link: "/profile/your-account/settings",
				icon: "user-2",
			},
		];
	}
}
