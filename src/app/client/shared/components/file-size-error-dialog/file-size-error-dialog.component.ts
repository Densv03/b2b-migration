import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { FileSizeErrorModel } from "./file-size-error.model";

@Component({
  selector: 'b2b-file-size-error-dialog',
  templateUrl: './file-size-error-dialog.component.html',
  styleUrls: ['./file-size-error-dialog.component.scss']
})
export class FileSizeErrorDialogComponent {

	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum.BACKGROUND_BLUE;
	public maxAllowedSize: number;
	public isSingleFile: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: FileSizeErrorModel,
							private dialogRef: MatDialogRef<FileSizeErrorDialogComponent>) {
		this.maxAllowedSize = data.maxAllowedSize
		this.isSingleFile = data.isSingleFile
	}

	public closeModal(): void {
		this.dialogRef.close();
	}
}
