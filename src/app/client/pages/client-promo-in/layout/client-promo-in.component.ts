import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-promo-in",
	templateUrl: "./client-promo-in.component.html",
	styleUrls: ["./client-promo-in.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPromoInComponent {
	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {}
}
