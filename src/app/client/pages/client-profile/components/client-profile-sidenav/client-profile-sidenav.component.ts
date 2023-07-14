import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";
import { SocketService } from "../../../../services/socket/socket.service";
import { UserService } from "../../services/user/user.service";

@Component({
	selector: "b2b-client-profile-sidenav",
	templateUrl: "./client-profile-sidenav.component.html",
	styleUrls: ["./client-profile-sidenav.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProfileSidenavComponent {
	@Input() public accountOptions: any[];
	@Input() public workspaceOptions: any[];
	@Input() public user: any;

	constructor(private readonly _socketService: SocketService, public readonly b2bNgxLinkService: B2bNgxLinkService) {}

	public get unreadOfferMessagesCount$() {
		return this._socketService.unreadOfferMessagesCount$;
	}

	public get unreadRfqMessagesCount$() {
		return this._socketService.unreadRfqMessagesCount$;
	}

	public get unreadMarketplaceMessagesCount$() {
		return this._socketService.unreadMarketplaceMessagesCount$;
	}
}
