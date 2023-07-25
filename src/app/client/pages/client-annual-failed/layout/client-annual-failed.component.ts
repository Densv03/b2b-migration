import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-annual-failed",
	templateUrl: "./client-annual-failed.component.html",
	styleUrls: ["./client-annual-failed.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientAnnualFailedComponent {
	public readonly b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {}
}
