import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-promo-pt",
	templateUrl: "./client-promo-pt.component.html",
	styleUrls: ["./client-promo-pt.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPromoPtComponent {
	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {}
}
