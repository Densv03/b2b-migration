import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "b2b-ngx-back",
	templateUrl: "./ngx-back.component.html",
	styleUrls: ["./ngx-back.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxBackComponent {
	@Input() public link: string = '';
	@Input() public className: string = '';

	public get linkClassName() {
		const defaultClassName = `flex items-center text-gray-500`;

		return `${defaultClassName} ${this.className}`;
	}
}
