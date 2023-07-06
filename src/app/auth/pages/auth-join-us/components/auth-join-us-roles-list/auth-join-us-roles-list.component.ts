import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "b2b-auth-join-us-roles-list",
	templateUrl: "./auth-join-us-roles-list.component.html",
	styleUrls: ["./auth-join-us-roles-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthJoinUsRolesListComponent {
	@Output() public readonly clicked: EventEmitter<any>;
	@Input() public readonly roles: any[];

	public readonly skeletonOptions: any[];

	constructor() {
		this.clicked = new EventEmitter<any>();
		this.skeletonOptions = this.getSkeletonOptions();
	}

	public emitClick(option) {
		this.clicked.emit(option);
	}

	public getSkeletonOptions() {
		return [
			{
				count: "3",
				animation: "pulse",
				theme: {
					height: "6.25rem",
				},
			},
		];
	}
}
