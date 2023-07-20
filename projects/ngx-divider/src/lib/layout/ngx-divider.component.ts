import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: " b2b-ngx-divider",
	templateUrl: "./ngx-divider.component.html",
	styleUrls: ["./ngx-divider.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2bNgxDividerComponent {
	@Input() public theme: "white" | "gray";

	constructor() {}
}
