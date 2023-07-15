import { ChangeDetectionStrategy, Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ValidationErrors} from "@angular/forms";

@Component({
	selector: "b2b-ngx-multiselect",
	templateUrl: "./ngx-multiselect.component.html",
	styleUrls: ["./ngx-multiselect.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => B2bNgxMultiselectComponent),
			multi: true,
		},
	],
})
export class B2bNgxMultiselectComponent implements ControlValueAccessor, OnChanges, OnInit {
	@Input() public options: any[];
	@Input() bindValue: string = "value";
	@Input() bindLabel: string = "label";
	@Input() placeholder: string = "";
	@Input() errors: ValidationErrors;
	@Input() touched: boolean;

	public formControl: FormControl<string[]> = new FormControl<string[]>([]);

	private onChange: (value: string[]) => void = () => null;
	private onTouched: () => void;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['errors']) {
			this.formControl.setErrors(changes['errors'].currentValue);
		}
	}

	ngOnInit() {
		this.subscribeOnValueChanges();
	}

	registerOnChange(fn: (value: string[]) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	writeValue(obj: any): void {
		this.formControl.setValue(obj);
	}

	private subscribeOnValueChanges(): void {
		this.formControl.valueChanges.subscribe((value) => {
			this.onChange(value);
		});
	}
}
