import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
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
// import { FormControl } from "@ngneat/reactive-forms";
// import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { idGenerator } from "@b2b/id-generator";

// @UntilDestroy()
@Component({
	selector: "b2b-ngx-toggle",
	templateUrl: "./ngx-toggle.component.html",
	styleUrls: ["./ngx-toggle.component.scss"],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => B2bNgxToggleComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => B2bNgxToggleComponent),
			multi: true,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2bNgxToggleComponent implements ControlValueAccessor, OnInit, OnChanges {
	@Input() public placeholder: string = '';

	@Input() errors: ValidationErrors = {};

	@Input() customLabel: string = '';

	@Input() emptyLabel: boolean = false;

	@Input() subcategories: boolean = false;

	@Input() toggled: boolean = false;

	@Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

	public readonly type: string;

  // TODO: use ngneat formControl
	public readonly formControl: FormControl<boolean | null>;
	public readonly id: string;

	private onChange: (value: boolean | null) => void;
	private onTouched: () => void;

	constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {
		this.type = "checkbox";

		this.onChange = () => null;
		this.onTouched = () => null;

		this.formControl = new FormControl<boolean>(false);
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

	public registerOnChange(fn: (value: boolean | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public writeValue(value: boolean): void {
		this.formControl.setValue(value, { emitEvent: false });
		this.toggled = value;
		this._changeDetectorRef.detectChanges();
	}

	public setDisabledState(isDisabled: boolean): void {
		if (isDisabled) {
			this.formControl.disable();
		} else {
			this.formControl.enable();
		}
	}

	public emitToggleChange(): void {
		this.toggled = !this.toggled;
		this.change.emit();
	}
}
