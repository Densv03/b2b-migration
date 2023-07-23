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
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter } from "rxjs/operators";

@UntilDestroy()
@Component({
	selector: "b2b-ngx-chips",
	templateUrl: "./ngx-chips.component.html",
	styleUrls: ["./ngx-chips.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => B2bNgxChipsComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => B2bNgxChipsComponent),
			multi: true,
		},
	],
})
export class B2bNgxChipsComponent implements OnChanges, ControlValueAccessor, OnInit {
	@Output() public readonly searched = new EventEmitter<string>();

	@Input() public className: any[];
	@Input() public options: any[];
	@Input() public searchedOptions: any[] = [];

	public formControl: FormControl;
	public readonly b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public readonly b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
	public svgStyle: object;
	public chips: any;

	private onChange: (value: string) => void;
	private onTouched: () => void;

	public searchedText: string;

	constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {
		this.formControl = new FormControl<any>('');
		this.svgStyle = this.getSvgStyle();
		this.chips = [];

		this.onChange = () => null;
		this.onTouched = () => null;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (!changes["options"]) {
			return;
		}
		if (changes["options"] && changes["options"].currentValue) {
			this.chips.splice(0, this.chips.length);
			this.chips.push(...changes["options"].currentValue);
			this.onChange(this.chips);
		}
	}

	public emitSearch(search: string) {
		this.searchedText = search;
		this.searched.emit(search);
	}

	ngOnInit() {
		this.formControl.valueChanges
			.pipe(
				untilDestroyed(this),
				filter((value) => !!value)
			)
			.subscribe((id) => {
				this.addChip(id);
			});
	}

	public addChip(id: any) {
		const newChip = (this.searchedOptions &&
			this.searchedOptions.find((searchedOption) => searchedOption._id === id)) || { name: id };

		const findedIndex = this.chips.findIndex((chip: { name: any; }) => chip.name === newChip.name);

		if (findedIndex === -1) {
			this.chips.push(newChip);
			this.formControl.reset("");
			this.onChange(this.chips);
		} else {
			this.formControl.setErrors({
				uniq: true,
			});
		}
	}

	public removeChip(chipToRemove: any) {
		const removeChipIndex = this.chips.findIndex((chip: any) => chip === chipToRemove);
		this.chips.splice(removeChipIndex, 1);
		this.onChange(this.chips);
	}

	public getSvgStyle() {
		return { "width.px": 16, "height.px": 16, "fill": "#ffffff" };
	}

	public validate(): ValidationErrors {
		return this.formControl.errors;
	}

	public registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public writeValue(value: string): void {
		this.chips = value;
		this._changeDetectorRef.detectChanges();
	}

	public setDisabledState(isDisabled: boolean): void {
		if (isDisabled) {
			this.formControl.disable();
		} else {
			this.formControl.enable();
		}
	}
}
