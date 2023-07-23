import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-admin-users-list",
	templateUrl: "./admin-users-list.component.html",
	styleUrls: ["./admin-users-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUsersListComponent {
	@Input() users: any[];
	@Input() menuOptions: any[];
}
