import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";
import { environment } from "../../../../../src/environments/environment";

@Directive({
	selector: "[b2bNgxImage]",
})
export class B2bNgxImageDirective implements OnChanges {
	@Input() public name: string = "plug";
	@Input() public imageExtension: string = "png";

	constructor(private readonly _elementRef: ElementRef) {
		// this.name = "plug";
		this._elementRef.nativeElement.src = `assets/images/${this.name}.${this.imageExtension}`;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (!changes['name']) {
			return;
		}

		const { currentValue } = changes['name'];

		if (!currentValue || currentValue === "null" || currentValue === "") {
			return;
		}

		this._elementRef.nativeElement.src = currentValue.includes("public")
			? `${environment.apiUrl}/${currentValue}`
			: `assets/images/${currentValue}.${this.imageExtension}`;
	}
}
