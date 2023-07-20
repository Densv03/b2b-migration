import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { B2bNgxLinkService } from "@b2b/ngx-link";
import { B2bNgxButtonThemeEnum } from "libs/ngx-button/src";

@Component({
	selector: "b2b-client-trading-wiki-list",
	templateUrl: "./client-trading-wiki-list.component.html",
	styleUrls: ["./client-trading-wiki-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTradingWikiListComponent {
	@Input() public readonly options: any[];

	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	}

	processArticleClick(id: any) {
	}
}
