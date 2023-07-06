import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-promo-eng",
	templateUrl: "./client-promo-tr.component.html",
	styleUrls: ["./client-promo-tr.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPromoTrComponent {
	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {}
}
