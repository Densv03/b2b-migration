import { ChangeDetectionStrategy, Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors} from "@angular/forms";
// import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { idGenerator } from "@b2b/id-generator";

// @UntilDestroy()
@Component({
	selector: "b2b-ngx-textarea",
	templateUrl: "./ngx-textarea.component.html",
	styleUrls: ["./ngx-textarea.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => B2bNgxTextareaComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => B2bNgxTextareaComponent),
			multi: true,
		},
	],
})
export class B2bNgxTextareaComponent implements ControlValueAccessor, OnInit, OnChanges {
	@Input() public placeholder: string;
	@Input() public label: string = '';
	@Input() public name: string = '';
	@Input() public cols: number;
	@Input() public rows: number;
	@Input() public theme?: string;

	@Input() errors?: ValidationErrors;

	public readonly formControl: FormControl<string | null>;
	public readonly id: string;

	private onChange: (value: string) => void;
	private onTouched: () => void;

	constructor() {
		this.onChange = () => null;
		this.onTouched = () => null;

		this.cols = 5;
		this.rows = 5;

		this.placeholder = "";
		this.formControl = new FormControl<string>('');
		this.id = idGenerator();
	}

	public get error(): string {
		if (!this.errors) {
			return "";
		}

		const firstErrorKey = Object.keys(this.errors)[0];

		return this.errors[firstErrorKey] as string;
	}

	ngOnInit(): void {
		this.subscribeOnValueChanges();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['errors']) {
			this.formControl.setErrors(changes['errors'].currentValue);
		}
	}

	public validate(): ValidationErrors | null {
		return this.formControl.errors;
	}

	private subscribeOnValueChanges(): void {
		this.formControl.valueChanges.pipe().subscribe((value: any) => {
			this.onChange(value);
		});
	}

	public registerOnChange(fn: (value: string) => void): void {
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
}
