import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { RfqButtonTypeEnum } from "../../../client-profile-tradebid/client-profile-tradebid-rfq/shared/enums/RfqButtonType.enum";

@Component({
	selector: "b2b-client-profile-marketplace-archive",
	templateUrl: "./client-profile-marketplace-archive.component.html",
	styleUrls: ["./client-profile-marketplace-archive.component.scss"],
})
export class ClientProfileMarketplaceArchiveComponent implements OnInit {
	@Input() archivedProducts$: Observable<any[]>;
	@Input() itemsForDropdown: any[] = [];

	@Output() delete: EventEmitter<string> = new EventEmitter<string>();
	@Output() restore: EventEmitter<string> = new EventEmitter<string>();

	public rfqButtonTypeEnum = RfqButtonTypeEnum;

	constructor() {}

	ngOnInit(): void {}

	public deleteProduct(id: string): void {
		this.delete.emit(id);
	}

	public restoreProduct(id: string): void {
		this.restore.emit(id);
	}
}
