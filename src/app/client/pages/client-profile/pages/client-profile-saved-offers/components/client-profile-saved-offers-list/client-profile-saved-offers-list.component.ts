import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-profile-saved-offers-list",
	templateUrl: "./client-profile-saved-offers-list.component.html",
	styleUrls: ["./client-profile-saved-offers-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProfileSavedOffersListComponent {
	@Input() public readonly options: any[];
	@Input() public readonly link: string;
	@Input() public readonly menuOptions: any[];

	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {}
}
