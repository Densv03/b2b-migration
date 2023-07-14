import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component, ElementRef,
	EventEmitter,
	forwardRef,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges, ViewChild,
} from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors} from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { idGenerator } from "@b2b/id-generator";
import { MatDialog } from "@angular/material/dialog";
import {
	FileSizeErrorDialogComponent
} from "../../../../../src/app/client/shared/components/file-size-error-dialog/file-size-error-dialog.component";


import { ImageExtensions } from '../../../../../src/app/core/add-offer/image-extensions';
import { DocumentExtensions } from '../../../../../src/app/core/add-offer/document-extensions';

import {
	ClientOfferDocumentComponent
} from "../../../../../src/app/client/pages/client-offer/components/client-offer-document/client-offer-document.component";
import { DocumentModel} from "../../../../../src/app/core/models/document.model";
import {DomSanitizer} from "@angular/platform-browser";

@UntilDestroy()
@Component({
	selector: "b2b-ngx-file",
	templateUrl: "./ngx-file.component.html",
	styleUrls: ["./ngx-file.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => B2bNgxFileComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => B2bNgxFileComponent),
			multi: true,
		},
	],
})
export class B2bNgxFileComponent implements ControlValueAccessor, OnInit, OnChanges {
	@ViewChild('fileInput') fileInput: ElementRef;
	@Input() public type: string;
	@Input() public placeholder: string;
	@Input() public theme: B2bNgxInputThemeEnum;
	@Input() public className: string;
	@Input() public isClickable: boolean;
	@Input() public maxAllowedSize: number = 50; //50mb
	@Input() public isPhoto: boolean;
	@Input() errors: ValidationErrors;
	@Input() public label: string;

	@Output() clicked = new EventEmitter<any>();

	public readonly formControl: FormControl<string>;
	public readonly id: string;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public files: any[];

	private onChange: (value: File[]) => void;
	private onTouched: () => void;
	private readonly maxAllowedSizeBytes: number;

	constructor(private readonly _cdR: ChangeDetectorRef,
							private readonly sanitizer: DomSanitizer,
							private readonly dialog: MatDialog) {
		this.type = "input";
		this.files = [];
		this.placeholder = "";
		this.theme = B2bNgxInputThemeEnum.BACKGROUND_GRAY;
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

		this.onChange = () => null;
		this.onTouched = () => null;

		this.formControl = new FormControl<string>('');
		this.id = idGenerator();

		this.maxAllowedSizeBytes = this.maxAllowedSize * Math.pow(10, 6);
	}

	public uploadFiles(event: Event): void {

		if (this.findTotalSize(Array.from((event.target as HTMLInputElement).files)) <= this.maxAllowedSizeBytes) {
			this.files = [...this.files, ...Array.from((event.target as HTMLInputElement).files)];
			this.onChange(this.files);
			this.files.length ? this.label = '' : null;
		} else {
			this.fileInput.nativeElement.value = "";
			this.dialog
				.open(FileSizeErrorDialogComponent, {
					data: {
						maxAllowedSize: this.maxAllowedSize,
						isSingleFile: false
					}
				})
		}
	}

	public handleClick(file: File | DocumentModel): void {
		this.clicked.emit(file)
	}


	public openUploadedDocument(file: File): void {

		const extension = file.name.split('.').pop().toLowerCase();
		let fullPath: any = '';

		const fileReader = new FileReader();
		fileReader.onload = () => {
			fullPath = fileReader.result;
			const data = {
				fullPath,
				extension,
				isImage: ImageExtensions.includes(extension),
				isDocument: DocumentExtensions.includes(extension),
			};

			this.dialog.open(ClientOfferDocumentComponent, {
				data,
				width: "80vw",
				height: "80vh",
			});
		}

		fileReader.readAsDataURL(file);
	}


	private openExistingDocument(file: DocumentModel): void {

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

	ngOnInit(): void {
		this.subscribeOnValueChanges();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["errors"]) {
			this.formControl.setErrors(changes["errors"].currentValue);
		}
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

	public writeValue(values: any[]): void {
		if (values) {
			this.files = values;
			// values
			// 	.filter((val) => val?._id)
			// 	.forEach((val) => {
			// 		this.files.push({ name: val._id });
			// 	});
			this._cdR.detectChanges();

			this.formControl.setValue("", { emitEvent: false });
		}
	}

	public setDisabledState(isDisabled: boolean): void {
		if (isDisabled) {
			this.formControl.disable();
		} else {
			this.formControl.enable();
		}
	}

	private findTotalSize(files: File[]): number {
		return files.reduce((accum, curr) => accum += curr.size, 0)
	}

	private subscribeOnValueChanges(): void {
		this.formControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value: any) => {
			this.onChange(value);
		});
	}

	public removeFile(fileName: string): void {
		this.files = this.files.filter((item: File) => item.name !== fileName)
		this.onChange(this.files)
	}
}
