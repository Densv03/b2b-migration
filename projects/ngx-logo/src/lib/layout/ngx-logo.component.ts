import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	Input,
	OnChanges,
	OnInit,
	Output, Pipe, PipeTransform,
	SimpleChanges,
	ViewChild,
} from "@angular/core";
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors} from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from "@angular/platform-browser";
import {async, BehaviorSubject, Observable} from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {idGenerator} from "@b2b/id-generator";
import {
  FileSizeErrorDialogComponent
} from "../../../../../src/app/client/shared/components/file-size-error-dialog/file-size-error-dialog.component";
import {Photo} from "../../../../../src/app/core/models/photo.model";
import {environment} from "../../../../../src/environments/environment";


@UntilDestroy()
@Component({
	selector: "b2b-ngx-logo",
	templateUrl: "./ngx-logo.component.html",
	styleUrls: ["./ngx-logo.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => B2bNgxLogoComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => B2bNgxLogoComponent),
			multi: true,
		},
	],
})
export class B2bNgxLogoComponent implements ControlValueAccessor, OnInit, OnChanges {

	@ViewChild('fileInput') fileInput: ElementRef;
	@Input() public readonly type: string;
	@Input() public readonly placeholder: string;
	@Input() public readonly theme: B2bNgxInputThemeEnum;
	@Input() public readonly className: string;
	@Input() public readonly label: string = "Choose logo";
	@Input() public readonly maxAllowedSize: number = 5; //5mb
	@Input() public readonly isPhoto: boolean;
	@Input() public readonly errors: ValidationErrors;


	public readonly formControl: FormControl<any>;
	public readonly id: string;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public logo: any;
	public logoPreviewUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');

	private onChange: (value: File[] | null) => void;
	private onTouched: () => void;
	private readonly maxAllowedSizeBytes: number;


	constructor(private readonly _cdR: ChangeDetectorRef,
							private readonly dialog: MatDialog) {
		this.type = "input";
		this.placeholder = "";
		this.theme = B2bNgxInputThemeEnum.BACKGROUND_GRAY;
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

		this.onChange = () => null;
		this.onTouched = () => null;

		this.formControl = new FormControl<any>('');
		this.id = idGenerator();
		this.maxAllowedSizeBytes = this.maxAllowedSize * Math.pow(10, 6);
	}

	get preview$(): Observable<string> {
		return this.logoPreviewUrl.asObservable();
	}

	ngOnInit(): void {
		this.subscribeOnValueChanges();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["errors"]) {
			this.formControl.setErrors(changes["errors"].currentValue);
		}
	}

	public uploadFiles(event: Event): void {
		this.logo = (event.target as HTMLInputElement).files[0];
		if(this.logo.size <= this.maxAllowedSizeBytes) {
			this.onChange([this.logo]);
			const fileReader = new FileReader();
			fileReader.onload = () =>
				this.logoPreviewUrl.next(fileReader.result as string);
			fileReader.readAsDataURL(this.logo);
		}
		else {
			this.onChange(null)
			this.fileInput.nativeElement.value = "";
			this.logo = undefined;
			this.dialog
				.open(FileSizeErrorDialogComponent, {
					data: {
						maxAllowedSize: this.maxAllowedSize,
						isSingleFile: false
					}
				})
		}

	}

	public get inputClassName(): string {
		return `${this.className}`;
	}

	public get error(): string {
		if (!this.errors) {
			return "";
		}

		const firstErrorKey = Object.keys(this.errors)[0];

		return this.errors[firstErrorKey] as string;
	}

	public validate(): ValidationErrors {
		return this.formControl.errors;
	}

	public registerOnChange(fn: (value: File[]) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public writeValue(value: Photo): void {
		if (value) {
			this.formControl.setValue(value)
			this.logo = value;
			this.logoPreviewUrl.next(environment.apiUrl + value.path)
			this._cdR.detectChanges();
		}
	}

	public setDisabledState(isDisabled: boolean): void {
		if (isDisabled) {
			this.formControl.disable();
		} else {
			this.formControl.enable();
		}
	}

	public removeLogo(): void {
		this.logo = undefined;
		this.onChange(null);
	}

	private subscribeOnValueChanges(): void {}
}


