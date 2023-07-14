import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from "@angular/core";
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ValidationErrors,
  FormArray,
  FormBuilder
} from "@angular/forms";

@Component({
	selector: "b2b-ngx-social-medias",
	templateUrl: "./ngx-social-medias.component.html",
	styleUrls: ["./ngx-social-medias.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => B2bNgxSocialMediasComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => B2bNgxSocialMediasComponent),
			multi: true,
		},
	],
})
export class B2bNgxSocialMediasComponent implements ControlValueAccessor {
	@Input() public readonly options: any[];
	@Input() public readonly className: string;
	@Input() public readonly iconClassName: string;
	@Input() public readonly defaultNumber: string = "";

	public readonly formArray: FormArray;

	private onChange: (value: string) => void;
	private onTouched: () => void;

	constructor(private readonly formBuilder: FormBuilder, private readonly _cdr: ChangeDetectorRef) {
		this.onChange = () => null;
		this.onTouched = () => null;

		this.formArray = this.getFormGroup();
		this.formArray.valueChanges.subscribe((value) => {
			this.onChange(this.transformData(value));
		});
	}

	public get activeOptions() {
		const formControls = this.formArray.controls;
		return this.options.map((option) => ({
			...option,
			value: "",
			active: formControls.find((formControl) => formControl.value.label === option.label),
		}));
	}

	public transformData(value: any[]) {
		return value.reduce((result, item) => {
			const data = {
				...result,
				[item.label.toLowerCase()]: item.value,
			};
			return data;
		}, {});
	}

	public getFormGroup() {
		return this.formBuilder.array([]);
	}

	public toggleSocialMedia(option: any) {
		const foundIndex = this.formArray.controls.findIndex((control) => control.value.label === option.label);

		if (foundIndex !== -1) {
			this.formArray.removeAt(foundIndex);
		} else {
			const formGroup = this.formBuilder.group(option);

			this.formArray.push(formGroup);
		}
		this._cdr.detectChanges();
	}

	public get ulClassName() {
		const defaultStyles = `flex items-center`;

		return `${defaultStyles} ${this.className}`;
	}

	public get liClassName() {
		const defaultStyles = `first:ml-0 last:mr-0`;

		return `${defaultStyles} ${this.iconClassName}`;
	}

	public validate(): ValidationErrors {
		return this.formArray.errors;
	}

	public registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public writeValue(value: any): void {
		const socials = Object.keys(value);
		socials.forEach((social) => {
			const label = social.charAt(0).toUpperCase() + social.slice(1);
			const option: any = {
				label,
				icon: this.options.find((option) => option.label === label).icon,
				value: value[social],
				active: undefined,
			};
			this.toggleSocialMedia(option);
		});
	}

	public setDisabledState(isDisabled: boolean): void {
		if (isDisabled) {
			this.formArray.disable();
		} else {
			this.formArray.enable();
		}
	}
}
