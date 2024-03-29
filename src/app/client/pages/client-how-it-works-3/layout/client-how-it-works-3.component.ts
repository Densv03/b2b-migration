import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-how-it-works-2",
	templateUrl: "./client-how-it-works-3.component.html",
	styleUrls: ["./client-how-it-works-3.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientHowItWorks3Component {
	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {}
}
