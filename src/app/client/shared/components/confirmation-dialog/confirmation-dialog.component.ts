import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";

@Component({
	selector: "b2b-confirmation-dialog",
	templateUrl: "./confirmation-dialog.component.html",
	styleUrls: ["./confirmation-dialog.component.scss"],
})
export class ConfirmationDialogComponent {
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public confirmButtonTheme = this.data.confirmButtonTheme as B2bNgxButtonThemeEnum;
	public cancelButtonTheme = this.data.cancelButtonTheme as B2bNgxButtonThemeEnum;

	constructor(
		private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			title?: string;
			message?: string;
			confirmButtonText: string;
			confirmButtonTheme: B2bNgxButtonThemeEnum;
			cancelButtonText?: string;
			cancelButtonTheme?: B2bNgxButtonThemeEnum;
		}
	) {}

	closeDialog(res: boolean): void {
		this.dialogRef.close(res);
	}
}
