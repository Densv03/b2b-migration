import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors} from "@angular/forms";
// TODO: uncomment code below when libs will be inserted in b2b
// import { FormControl } from "@ngneat/reactive-forms";
// import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
// @ts-ignore
import {getName} from 'country-list'
import {COUNTRIES} from "../data";
import {B2bNgxSelectThemeEnum} from "@b2b/ngx-select";

// @UntilDestroy()
@Component({
	selector: "b2b-ngx-country-select",
	templateUrl: "./ngx-country-select.component.html",
	styleUrls: ["./ngx-country-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => B2bNgxCountrySelectComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => B2bNgxCountrySelectComponent),
			multi: true,
		},
	],
})
export class B2bNgxCountrySelectComponent implements ControlValueAccessor, OnInit, OnChanges {
	@Input() errors: ValidationErrors = {};

	@Input() showInTransit?: boolean;
	@Input() public theme: B2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum.BACKGROUND_GRAY;
	@Input() public className: string = '';
	@Input() public placeholder: string;
	@Input() public multiple: boolean = false;
	@Input() public touched: boolean = false;

	@Output() openSelect: EventEmitter<void> = new EventEmitter<void>();
	@Output() closeSelect: EventEmitter<void> = new EventEmitter<void>();

	public readonly formControl: FormControl<string | null>;
	public options: any[] = [];

	private onChange: (value: string | null) => void;
	private onTouched: () => void;

	constructor() {
		this.placeholder = "";

		this.onChange = () => null;
		this.onTouched = () => null;

		this.formControl = new FormControl<string | null>(null);
	}

	public get selectClassName() {
		const defaultClassName = ``;

		return `${defaultClassName} ${this.theme} ${this.className}`;
	}

	public getOptions() {
		const countriesArr = COUNTRIES.map((country) => ({
			label: getName(country),
			icon: country,
			code: country.toLowerCase(),
		})).sort((a, b): number => a.label.localeCompare(b.label));

		if (this.showInTransit) {
			countriesArr.unshift({
				label: 'In transit',
				icon: "ship-in-transit",
				code: "In transit"
			})
		}

		return countriesArr;
	}

	public get error(): string {
		if (!this.errors) {
			return "";
		}

		const firstErrorKey = Object.keys(this.errors)[0];

		return this.errors[firstErrorKey] as string;
	}

	public ngOnInit(): void {
		this.subscribeOnValueChanges();
		this.options = this.getOptions();
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['errors']) {
			this.formControl.setErrors(changes['errors'].currentValue);
		}
	}

	public validate(): ValidationErrors | null {
		return this.formControl.errors;
	}

	public registerOnChange(fn: (value: string | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public writeValue(value: string): void {
		this.formControl.setValue(value);
	}

	public setDisabledState(isDisabled: boolean): void {
		if (isDisabled) {
			this.formControl.disable();
		} else {
			this.formControl.enable();
		}
	}

	public emitOpen() {
		this.openSelect.emit();
	}

	public emitClose() {
		this.closeSelect.emit();
	}

	private subscribeOnValueChanges(): void {
		this.formControl.valueChanges.pipe().subscribe((value) => {
			this.onChange(value);
		});
	}
}
