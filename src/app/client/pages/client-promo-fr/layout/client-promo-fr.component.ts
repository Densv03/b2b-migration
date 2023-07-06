import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-promo-fr",
	templateUrl: "./client-promo-fr.component.html",
	styleUrls: ["./client-promo-fr.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPromoFrComponent {
	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {}
}
