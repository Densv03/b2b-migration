import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-profile-saved-offers-list",
	templateUrl: "./client-profile-saved-offers-list.component.html",
	styleUrls: ["./client-profile-saved-offers-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProfileSavedOffersListComponent {
	@Input() public options: any[];
	@Input() public link: string;
	@Input() public menuOptions: any[];

	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {}
}
