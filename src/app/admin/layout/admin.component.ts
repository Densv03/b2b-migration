import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { AdminSidenavData } from "../data/admin-sidenav.data";

@Component({
	selector: "b2b-admin",
	templateUrl: "./admin.component.html",
	styleUrls: ["./admin.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
	public readonly sidenavOptions: any[];

	constructor() {
		this.sidenavOptions = AdminSidenavData;
	}
}
