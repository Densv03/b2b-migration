import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-promo-esp",
	templateUrl: "./client-promo-esp.component.html",
	styleUrls: ["./client-promo-esp.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPromoEspComponent {
	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {}
}
