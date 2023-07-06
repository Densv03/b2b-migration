import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "b2b-client-badge",
	templateUrl: "./client-badge.component.html",
	styleUrls: ["./client-badge.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientBadgeComponent {
	@Input() bgColor: string;
	@Input() text: string;
}
