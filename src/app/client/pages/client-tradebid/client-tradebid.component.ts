import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { B2bNgxLinkService } from "@b2b/ngx-link";
import { Observable } from "rxjs";

@Component({
	selector: "b2b-client-tradebid",
	templateUrl: "client-tradebid.component.html",
	styleUrls: ["./client-tradebid.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTradebidComponent implements OnInit {
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public tradebidWhatIsSafeUrl: SafeResourceUrl;

	constructor(domSanitizer: DomSanitizer, private linkService: B2bNgxLinkService) {
		this.tradebidWhatIsSafeUrl = domSanitizer.bypassSecurityTrustResourceUrl(`assets/images/tradebid_what-is.svg`);
	}

	public getLink(link: string): Observable<string> {
		return this.linkService.getLink(link);
	}

	ngOnInit() {}
}
