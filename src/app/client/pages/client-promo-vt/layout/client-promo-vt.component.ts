import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-promo-vt",
	templateUrl: "./client-promo-vt.component.html",
	styleUrls: ["./client-promo-vt.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPromoVtComponent {
	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {}
}
