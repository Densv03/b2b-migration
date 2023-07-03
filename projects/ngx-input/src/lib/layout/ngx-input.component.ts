import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { idGenerator } from "@b2b/id-generator";
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors} from "@angular/forms";
// TODO: uncomment code below when libs will be inserted in b2b
// import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import {B2bNgxInputThemeEnum} from "../enum/ngx-input-theme.enum";

// @UntilDestroy()
@Component({
	selector: "b2b-ngx-input",
	templateUrl: "./ngx-input.component.html",
	styleUrls: ["./ngx-input.component.scss"],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => B2bNgxInputComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => B2bNgxInputComponent),
			multi: true,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2bNgxInputComponent implements ControlValueAccessor, OnInit, OnChanges {
	@Input() public readonly type: string;
	@Input() public readonly placeholder: string;
	@Input() public readonly theme: B2bNgxInputThemeEnum;
	@Input() public readonly label: string = '';
	@Input() public readonly errors: string = '';

	public readonly formControl: FormControl<string | null>;
	public readonly id: string;

	private onChange: (value: string | null) => void;
	private onTouched: () => void;

	constructor(private readonly _changeDetectionRef: ChangeDetectorRef) {
		this.type = "input";
		this.placeholder = "";
		this.theme = B2bNgxInputThemeEnum.BACKGROUND_GRAY;

		this.onChange = () => null;
		this.onTouched = () => null;

		this.formControl = new FormControl<string | null>('');
		this.id = idGenerator();
    this.id = 'id'
	}

	ngOnChanges(changes: SimpleChanges) {
		if (!changes['errors']) {
			return;
		}
    this.formControl.setErrors(changes['errors']);
	}

	ngOnInit(): void {
		this.subscribeOnValueChanges();
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
}
