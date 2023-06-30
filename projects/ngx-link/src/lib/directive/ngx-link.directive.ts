import {Directive, ElementRef, Input, OnChanges, Renderer2} from "@angular/core";
import {NgxChanges} from '../../../../shared/src/interfaces/on-changes.interface'
import {B2bNgxLinkThemeEnum} from "@b2b/ngx-link";

function isValueInEnum(value: string, enumArray: any): boolean {
	return Object.values(enumArray).includes(value);
}

@Directive({
	selector: "[b2bNgxLink]",
})
export class B2bNgxLinkDirective implements OnChanges {
	@Input() theme: B2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum.BACKGROUND_WHITE;

	constructor(private readonly _renderer2: Renderer2, private readonly _elementRef: ElementRef) {
		this._renderer2.addClass(this._elementRef.nativeElement, `b2b-ngx-link`);
	}

	ngOnChanges(changes: NgxChanges<B2bNgxLinkDirective>) {
		if (!changes.theme || !isValueInEnum(changes.theme.currentValue, B2bNgxLinkThemeEnum)) {
			return;
		}

		const { currentValue } = changes.theme;
		const category = currentValue.split("-")[0];

		this._renderer2.addClass(this._elementRef.nativeElement, category);
		this._renderer2.addClass(this._elementRef.nativeElement, currentValue);
	}
}
