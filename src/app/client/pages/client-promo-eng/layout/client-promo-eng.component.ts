import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-promo-eng",
	templateUrl: "./client-promo-eng.component.html",
	styleUrls: ["./client-promo-eng.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPromoEngComponent {
	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {}
}
