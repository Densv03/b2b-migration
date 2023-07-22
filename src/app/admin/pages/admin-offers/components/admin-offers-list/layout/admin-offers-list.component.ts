import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AdminListType } from "../../../../../admin-list-type";

@Component({
	selector: "app-admin-offers-list",
	templateUrl: "./admin-offers-list.component.html",
	styleUrls: ["./admin-offers-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOffersListComponent {
	@Input() public offers: any[];
	@Input() public link: string;
	@Input() public menuOptions: any;
	@Input() public listType: AdminListType;
}
