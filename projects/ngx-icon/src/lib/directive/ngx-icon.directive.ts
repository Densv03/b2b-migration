import { Directive, ElementRef, Input, OnChanges, Renderer2 } from "@angular/core";
import { B2bNgxIconThemeEnum} from "../enums";
import { NgxChanges } from "../../../../shared/src/interfaces/on-changes.interface";

@Directive({
	selector: "[b2bNgxIcon]",
})
export class B2bNgxIconDirective implements OnChanges {
	@Input() theme: B2bNgxIconThemeEnum = B2bNgxIconThemeEnum.CIRCLE;
	@Input() name: string = '';
	@Input() group: string = '';

	constructor(private readonly _elementRef: ElementRef, private readonly _renderer2: Renderer2) {
		this._renderer2.addClass(this._elementRef.nativeElement, `b2b-ngx-icon`);
	}

	ngOnChanges(changes: NgxChanges<B2bNgxIconDirective>) {
		if (changes.name) {
			const groupName = this.group ?? "";
			this._elementRef.nativeElement.src = `assets/icons/${groupName}${changes.name.currentValue}.svg`;
		} else if (changes.theme) {
			this._renderer2.addClass(this._elementRef.nativeElement, changes.theme.currentValue);
		} else {
			return;
		}
	}
}
