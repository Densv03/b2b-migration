import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-promo-ar",
	templateUrl: "./client-promo-ar.component.html",
	styleUrls: ["./client-promo-ar.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPromoArComponent {
	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {}
}
