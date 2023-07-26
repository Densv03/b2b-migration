import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { ClientProfileTradebidService } from "../../../client-profile-tradebid.service";
import {MixpanelService} from "../../../../../../../../core/services/mixpanel/mixpanel.service";

@Component({
	selector: "b2b-client-profile-tradebid-archived",
	templateUrl: "./client-profile-tradebid-archived.component.html",
	styleUrls: ["./client-profile-tradebid-archived.component.scss"],
})
export class ClientProfileTradebidArchivedComponent {
	public archiveList$: Observable<any> = this.clientTradeBidService.myRfqArchived$;

	@Input() buttonType: any;
	@Output() delete: EventEmitter<string | number> = new EventEmitter<string | number>();
	@Output() restore: EventEmitter<string | number> = new EventEmitter<string | number>();

	constructor(private clientTradeBidService: ClientProfileTradebidService,
              private readonly mixpanelService: MixpanelService) {}
  public deleteEvent(event: any): void {
    this.delete.emit(event._id)
    this.mixpanelService.track('RFQ deleted', {
      'Product Sector': event.category,
      'Destination': event.destination.to
    });
  }
  public restoreEvent(event: any): void {
    this.restore.emit(event._id)
    this.mixpanelService.track('Archived RFQ posted', {
      'Product Sector': event.category,
      'Destination': event.destination.to
    });
  }
}
