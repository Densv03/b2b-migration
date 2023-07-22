import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "b2b-admin-user",
	templateUrl: "./admin-user.component.html",
	styleUrls: ["./admin-user.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUserComponent {}
