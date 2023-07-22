import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { animate, style, transition, trigger } from "@angular/animations";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
	selector: "b2b-change-quotes-amount-dialog",
	templateUrl: "./change-quotes-amount-dialog.component.html",
	styleUrls: ["./change-quotes-amount-dialog.component.scss"],
	animations: [
		trigger("fadeInOut", [
			transition(":enter", [
				// :enter is alias to 'void => *'
				style({ opacity: 0 }),
				animate(500, style({ opacity: 1 })),
			]),
			transition(":leave", [
				// :leave is alias to '* => void'
				animate(500, style({ opacity: 0 })),
			]),
		]),
	],
})
export class ChangeQuotesAmountDialogComponent implements OnInit {
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public currentValueQuotes: number;
	public quotesValue: number;
	public form: FormGroup;
	public formState: any;

	constructor(
		private dialogRef: MatDialogRef<ChangeQuotesAmountDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private data: { currentValue: number },
		private fb: FormBuilder
	) {
		this.currentValueQuotes = this.data.currentValue;
		this.quotesValue = this.currentValueQuotes;
		this.form = this.fb.group({
			quotesNumber: [""],
		});
		this.formState = this.form.controls;
	}

	ngOnInit(): void {}

	confirmChanges() {
		this.dialogRef.close(+this.quotesValue);
	}
}
