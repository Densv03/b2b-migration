import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "b2b-ngx-icon",
	templateUrl: "./ngx-icon.component.html",
	styleUrls: ["./ngx-icon.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2bNgxIconComponent {
	@Input() public readonly name: string = '';
	@Input() public readonly theme: string = '';
	@Input() public readonly className: string = '';
	@Input() public readonly svgStyle: object = {};

	constructor() {}

	public get svgClassName() {
		const defaultStyles = "";
		const circleStyles = "flex justify-center items-center rounded-full p-3 bg-gray-100";
		const themeStyles = this.theme === "circle" ? circleStyles : "";

		return `${defaultStyles} ${themeStyles}`;
	}

	public get src() {
		return `assets/icons/${this.name}.svg`;
	}
}
