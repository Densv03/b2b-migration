import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ClientProfileTradebidService } from "../../client-profile-tradebid.service";
import { Observable } from "rxjs";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";

function generateQueryString(obj, initialValue: string = "?") {
	return Object.entries(obj)
		.filter(([, value]: any) => !!value)
		.reduce((queryString: string, [key, value]: any) => {
			return Array.isArray(value)
				? `${queryString}${value.reduce((str, arrayItem) => `${str}${key}=${arrayItem}&`, "")}`
				: `${queryString}${key}=${value}&`;
		}, initialValue);
}

@Component({
	selector: "b2b-client-profile-tradebid-quotation",
	templateUrl: "./client-profile-tradebid-quotation.component.html",
	styleUrls: ["./client-profile-tradebid-quotation.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProfileTradebidQuotationComponent implements OnInit {
	public chatsList$: Observable<any> = this.clientTradebidService.myQuotationChats$;
	public totalChatsLength$: Observable<number> = this.clientTradebidService.quotationChatsLength$;
	private filteredQueryObj: any = { limit: 7, offset: 0 };
	constructor(private clientTradebidService: ClientProfileTradebidService) {}

	ngOnInit(): void {
		this.clientTradebidService.updateQuotationChatsList(generateQueryString(this.filteredQueryObj, "&"));
	}

	public togglePageManageList(pageNumber: number): void {
		this.filteredQueryObj = { ...this.filteredQueryObj, offset: (pageNumber - 1) * 7 };
		this.clientTradebidService.updateQuotationChatsList(generateQueryString(this.filteredQueryObj, "&"));
	}

	updateChat() {
		this.clientTradebidService.updateQuotationChatsList();
	}
}
