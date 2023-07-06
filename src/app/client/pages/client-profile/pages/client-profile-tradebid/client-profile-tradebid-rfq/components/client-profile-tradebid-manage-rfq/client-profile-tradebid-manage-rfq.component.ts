import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RfqButtonTypeEnum } from "../../shared/enums/RfqButtonType.enum";
import { ClientProfileTradebidService } from "../../../client-profile-tradebid.service";
import { Observable } from "rxjs";

@Component({
	selector: "b2b-client-profile-tradebid-manage-rfq",
	templateUrl: "./client-profile-tradebid-manage-rfq.component.html",
	styleUrls: ["./client-profile-tradebid-manage-rfq.component.scss"],
})
export class ClientProfileTradebidManageRfqComponent implements OnInit {
	public manageList$: Observable<any> = this.clientTradeBidService.myRfqManage$;

	@Input() buttonType: RfqButtonTypeEnum = RfqButtonTypeEnum.Manage;
	@Output() edit: EventEmitter<string | number> = new EventEmitter<string | number>();
	@Output() archivate: EventEmitter<string | number> = new EventEmitter<string | number>();

	constructor(private clientTradeBidService: ClientProfileTradebidService) {}

	public ngOnInit(): void {}

	public onEdit(id: string | number): void {
		this.edit.emit(id);
	}

	public onArchivate(id: string | number): void {
		this.archivate.emit(id);
	}
}
