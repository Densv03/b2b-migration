import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "b2b-ngx-button",
	templateUrl: "./ngx-button.component.html",
	styleUrls: ["./ngx-button.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2bNgxButtonComponent {
	@Output() clicked: EventEmitter<any>;

	@Input() public readonly type: string;
	@Input() public readonly theme: "black" | "white" | "blue" | "black-outline" | "white-outline" = "black";
	@Input() public readonly className: string = '';

	constructor() {
		this.type = "button";
		this.clicked = new EventEmitter<any>();
	}

	public emitClick(event: MouseEvent) {
		this.clicked.emit(event);
	}

	public get buttonClassName() {
		const defaultStyles =
			"rounded cursor-pointer transition-colors duration-300 border border-solid border-transparent";

		const blackThemeStyles = "bg-black text-white hover:bg-gray-800";
		const whiteThemeStyles = "bg-white text-black hover:bg-blue-50 shadow";
		const blueThemeStyles = "bg-blue-600 text-white hover:bg-blue-500";
		const blackOutlineThemeStyles = "border-black hover:bg-blue-50 shadow";
		const whiteOutlineThemeStyles = "border-white text-white hover:bg-blue-50";

		const themeStyles = {
			"white": whiteThemeStyles,
			"black": blackThemeStyles,
			"blue": blueThemeStyles,
			"black-outline": blackOutlineThemeStyles,
			"white-outline": whiteOutlineThemeStyles,
		}[this.theme];

		return `${defaultStyles} ${themeStyles} ${this.className}`;
	}
}
