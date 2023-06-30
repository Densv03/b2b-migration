import {Directive, ElementRef, Input, OnChanges, Renderer2} from "@angular/core";
import {NgxChanges} from '../../../../shared/src/interfaces/on-changes.interface'
import {B2bNgxInputThemeEnum} from "../enum/ngx-input-theme.enum";

function isValueInEnum(value: string, enumArray: any): boolean {
	return Object.values(enumArray).includes(value);
}

@Directive({
	selector: "[b2bNgxInput]",
})
export class B2bNgxInputDirective implements OnChanges {
	@Input() theme: B2bNgxInputThemeEnum = B2bNgxInputThemeEnum.BACKGROUND_WHITE;
	@Input() label: string = '';
	@Input() labelClass: string = '';

	constructor(private readonly _renderer2: Renderer2, private readonly _elementRef: ElementRef) {
		this._renderer2.addClass(this._elementRef.nativeElement, `b2b-ngx-input`);
	}

	ngOnChanges(changes: NgxChanges<B2bNgxInputDirective>) {
		if (!changes.theme?.currentValue) {
			this._renderer2.removeClass(this._elementRef.nativeElement, changes.theme.previousValue);
		}
		if (changes.theme && isValueInEnum(changes.theme.currentValue, B2bNgxInputThemeEnum)) {
			const { currentValue } = changes.theme;
			const category = currentValue.split("-")[0];

			this._renderer2.addClass(this._elementRef.nativeElement, category);
			this._renderer2.addClass(this._elementRef.nativeElement, currentValue);
		}

		if (changes.label) {
			const { nativeElement } = this._elementRef;
			const { parentElement } = nativeElement;

			const labelElement = this._renderer2.createElement("span");
			const labelText = this._renderer2.createText(this.label);

			this._renderer2.appendChild(labelElement, labelText);

			this._renderer2.addClass(labelElement, "b2b-ngx-input-label");
			this._renderer2.addClass(labelElement, this.labelClass);

			this._renderer2.insertBefore(parentElement, labelElement, nativeElement);
		}
	}
}
