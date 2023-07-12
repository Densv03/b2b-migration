import { ChangeDetectionStrategy, Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { idGenerator } from "@b2b/id-generator";
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors} from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
	selector: "b2b-ngx-radio",
	templateUrl: "./ngx-radio.component.html",
	styleUrls: ["./ngx-radio.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => B2bNgxRadioComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => B2bNgxRadioComponent),
			multi: true,
		},
	],
})
export class B2bNgxRadioComponent implements ControlValueAccessor, OnInit, OnChanges {
	@Input() public placeholder: string;
	@Input() public checked: boolean;
	@Input() public options: any;
	@Input() public customClass: string;

	@Input() errors: ValidationErrors;

	public readonly type: string;
	public readonly formControl: FormControl<string>;
	public readonly id: string;

	private onChange: (value: string) => void;
	private onTouched: () => void;

	constructor() {
		this.type = "checkbox";

		this.onChange = () => null;
		this.onTouched = () => null;

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

	public validate(): ValidationErrors {
		return this.formControl.errors;
	}

	private subscribeOnValueChanges(): void {
		this.formControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
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
