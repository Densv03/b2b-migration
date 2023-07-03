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
import { idGenerator } from "@b2b/id-generator";
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors} from "@angular/forms";
// TODO: uncomment code below when libs will be inserted in b2b
// import { FormControl } from "@ngneat/reactive-forms";
// import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

// @UntilDestroy()
@Component({
	selector: "b2b-ngx-checkbox",
	templateUrl: "./ngx-checkbox.component.html",
	styleUrls: ["./ngx-checkbox.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => B2bNgxCheckboxComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => B2bNgxCheckboxComponent),
			multi: true,
		},
	],
})
export class B2bNgxCheckboxComponent implements ControlValueAccessor, OnInit, OnChanges {
	@Input() public  placeholder: string = '';
	@Input() public checked: boolean = false;
	@Input() public customClass: string = ''
	@Input() public errors: ValidationErrors = {};

	@Output() change: EventEmitter<Event> = new EventEmitter<Event>();

	public readonly type: string;
	public readonly formControl: FormControl<string | null>;
	public readonly id: string;

	private onChange: (value: string | null) => void;
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

	public validate(): ValidationErrors | null {
		return this.formControl.errors;
	}

	private subscribeOnValueChanges(): void {
		this.formControl.valueChanges.pipe().subscribe((value) => {
			this.onChange(value);
		});
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

	public onCheckboxChange(e: Event): void {
		this.change.emit(e);
	}
}
