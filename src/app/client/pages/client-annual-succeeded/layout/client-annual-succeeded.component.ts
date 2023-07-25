import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-annual-succeeded",
	templateUrl: "./client-annual-succeeded.component.html",
	styleUrls: ["./client-annual-succeeded.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientAnnualSucceededComponent {
	public readonly b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {}
}
