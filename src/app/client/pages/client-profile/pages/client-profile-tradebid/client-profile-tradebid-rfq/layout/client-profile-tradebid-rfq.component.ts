import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { RfqButtonTypeEnum } from "../shared/enums/RfqButtonType.enum";
import { Observable } from "rxjs";
import { ClientProfileTradebidService } from "../../client-profile-tradebid.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PaginationParamsModel } from "../../../../../../../core/models/pagination-params.model";

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
	selector: "b2b-client-profile-tradebid-my-rfq",
	templateUrl: "./client-profile-tradebid-rfq.component.html",
	styleUrls: ["./client-profile-tradebid-rfq.component.scss"],
})
export class ClientProfileTradebidRfqComponent implements OnInit {
	public totalChatsLength$: Observable<number> = this.clientTradeBidService.rfqChatsLength$;
	public totalManageLength$: Observable<number> = this.clientTradeBidService.manageListLength$;
	public totalArchivedLength$: Observable<number> = this.clientTradeBidService.archivedListLength$;
	public rfqButtonEnum = RfqButtonTypeEnum;
	public itemId: string | number;

	private filteredQueryObj: PaginationParamsModel = { limit: 7, offset: 0 };
	constructor(
		private clientTradeBidService: ClientProfileTradebidService,
		private changeDetectorRef: ChangeDetectorRef,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.clientTradeBidService.updateRfqManageList(generateQueryString(this.filteredQueryObj));
		this.clientTradeBidService.updateRfqArchivedList(generateQueryString(this.filteredQueryObj));
		this.clientTradeBidService.updateRfqChatsList(generateQueryString(this.filteredQueryObj, "&"));
	}

	public onEdit(id: number | string): void {
		this.router.navigate(["change-rfq", id], {
			relativeTo: this.route,
		});
	}

	public onArchivate(id: number | string): void {
		this.clientTradeBidService.archivateItem(id).subscribe((el) => {
			this.clientTradeBidService.updateRfqArchivedList(generateQueryString(this.filteredQueryObj));
			this.clientTradeBidService.updateRfqManageList(generateQueryString(this.filteredQueryObj));
		});
	}

	public onDelete(id: number | string): void {
		this.clientTradeBidService.deleteItem(id).subscribe((el) => {
			this.clientTradeBidService.updateRfqArchivedList(generateQueryString(this.filteredQueryObj));
		});
	}

	public onRestore(id: number | string): void {
		this.clientTradeBidService.activateItem(id).subscribe((el) => {
			this.clientTradeBidService.updateRfqArchivedList(generateQueryString(this.filteredQueryObj));
			this.clientTradeBidService.updateRfqManageList(generateQueryString(this.filteredQueryObj));
		});
	}

	public togglePageManageList(pageNumber: number): void {
		this.filteredQueryObj = { ...this.filteredQueryObj, offset: (pageNumber - 1) * 7 };
		this.clientTradeBidService.updateRfqManageList(generateQueryString(this.filteredQueryObj));
	}
	public togglePageArchiveList(pageNumber: number): void {
		this.filteredQueryObj = { ...this.filteredQueryObj, offset: (pageNumber - 1) * 7 };
		this.clientTradeBidService.updateRfqArchivedList(generateQueryString(this.filteredQueryObj));
	}
	public togglePageChatsList(pageNumber: number): void {
		this.filteredQueryObj = { ...this.filteredQueryObj, offset: (pageNumber - 1) * 7 };
		this.clientTradeBidService.updateRfqChatsList(generateQueryString(this.filteredQueryObj, "&"));
	}

	public updateComponent(): void {
		this.changeDetectorRef.detectChanges();
	}
}
