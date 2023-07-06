import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ClientProfileTradebidService } from "../../../client-profile-tradebid.service";
import { Observable } from "rxjs";

@Component({
	selector: "b2b-client-profile-tradebid-chats",
	templateUrl: "./client-profile-tradebid-chats.component.html",
	styleUrls: ["./client-profile-tradebid-chats.component.scss"],
})
export class ClientProfileTradebidChatsComponent implements OnInit {
	@Output() deleteChat: EventEmitter<void> = new EventEmitter<void>();

	public chatsList$: Observable<any> = this.clientTradebidService.myRfqChats$;
	constructor(
		private clientTradebidService: ClientProfileTradebidService,
		private changeDetectorRef: ChangeDetectorRef
	) {}

	ngOnInit(): void {}

	public updateComponent(): void {
		this.clientTradebidService.updateRfqChatsList();
		this.deleteChat.emit();
	}
}
