import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RfqButtonTypeEnum } from "../../shared/enums/RfqButtonType.enum";
import { ClientProfileTradebidService } from "../../../client-profile-tradebid.service";
import { Observable } from "rxjs";
import {MixpanelService} from "../../../../../../../../core/services/mixpanel/mixpanel.service";
import {CategoriesService} from "../../../../../../../services/categories/categories.service";
import {take} from "rxjs/operators";

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

	constructor(private clientTradeBidService: ClientProfileTradebidService,
              private readonly mixpanelService: MixpanelService,
              private readonly categoriesService: CategoriesService) {}

	public ngOnInit(): void {}

	public onEdit(id: string | number): void {
		this.edit.emit(id);
	}

	public onArchivate(item: any): void {
		this.archivate.emit(item._id);

    this.mixpanelService.track('RFQ archived', {
      'Product Sector': this.getCategoryName(item.category),
      'Destination': item.destination.to
    });
	}
  private getCategoryName(id: string): string {
    let categoryName: string
    this.categoriesService.getCategoryNameById(id)
      .pipe(take(1))
      .subscribe(name => categoryName = name)
    return categoryName;
  }
}
