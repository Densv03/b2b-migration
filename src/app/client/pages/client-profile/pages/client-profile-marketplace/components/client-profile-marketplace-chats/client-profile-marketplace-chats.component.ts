import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ClientMarketplaceService } from "../../../../../client-marketplace/client-marketplace.service";
import { Observable } from "rxjs";

@Component({
	selector: "b2b-client-profile-marketplace-chats",
	templateUrl: "./client-profile-marketplace-chats.component.html",
	styleUrls: ["./client-profile-marketplace-chats.component.scss"],
})
export class ClientProfileMarketplaceChatsComponent implements OnInit {
	@Input() chats: any[] = [];
	@Output() chatDelete: EventEmitter<void> = new EventEmitter<void>();

	public marketplaceSkeletonOptions: any = this.clientMarketplaceService.getMarketplaceSkeletonOptions();
	public loading$: Observable<boolean> = this.clientMarketplaceService.loading$;

	constructor(private clientMarketplaceService: ClientMarketplaceService) {}

	ngOnInit(): void {}

	public deleteChat(): void {
		this.chatDelete.emit();
	}
}
