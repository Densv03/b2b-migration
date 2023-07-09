import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { ClientProfileTradebidService } from "../../../client-profile-tradebid.service";

@Component({
	selector: "b2b-client-profile-tradebid-archived",
	templateUrl: "./client-profile-tradebid-archived.component.html",
	styleUrls: ["./client-profile-tradebid-archived.component.scss"],
})
export class ClientProfileTradebidArchivedComponent implements OnInit {
	public archiveList$: Observable<any> = this.clientTradeBidService.myRfqArchived$;

	@Input() buttonType: any;
	@Output() delete: EventEmitter<string | number> = new EventEmitter<string | number>();
	@Output() restore: EventEmitter<string | number> = new EventEmitter<string | number>();

	constructor(private clientTradeBidService: ClientProfileTradebidService) {}

	ngOnInit(): void {}
}
