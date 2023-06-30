import {Directive, ElementRef, Input, OnChanges, Renderer2} from "@angular/core";
import {NgxChanges} from '../../../../shared/src/interfaces/on-changes.interface'
import {B2bNgxButtonThemeEnum} from "../enum/ngx-button-theme.enum";

function isValueInEnum(value: string, enumArray: any): boolean {
	return Object.values(enumArray).includes(value);
}

@Directive({
	selector: "[b2bNgxButton]",
})
export class B2bNgxButtonDirective implements OnChanges {
	@Input() theme: B2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum.BACKGROUND_BLACK;

	constructor(private readonly _renderer2: Renderer2, private readonly _elementRef: ElementRef) {
		this._renderer2.addClass(this._elementRef.nativeElement, `b2b-ngx-button`);
	}

	ngOnChanges(changes: NgxChanges<B2bNgxButtonDirective>) {
		if (!changes.theme || !isValueInEnum(changes.theme.currentValue, B2bNgxButtonThemeEnum)) {
			return;
		}

		const { currentValue } = changes.theme;
		const category = currentValue.split("-")[0];

		this._renderer2.addClass(this._elementRef.nativeElement, category);
		this._renderer2.addClass(this._elementRef.nativeElement, currentValue);
	}
}
