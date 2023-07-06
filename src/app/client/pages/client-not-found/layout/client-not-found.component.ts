import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import {B2bNgxLinkService, B2bNgxLinkThemeEnum} from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-not-found",
	templateUrl: "./client-not-found.component.html",
	styleUrls: ["./client-not-found.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientNotFoundComponent {
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;

	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	}
}
