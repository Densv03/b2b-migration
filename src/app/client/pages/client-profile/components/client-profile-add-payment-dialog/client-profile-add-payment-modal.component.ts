import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { onlyNumber } from "../../../../../core/helpers/validator/only-number";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { FormBuilder } from "@ngneat/reactive-forms";
import { MatDialogRef } from "@angular/material/dialog";
import { expireDate } from "../../../../../core/helpers/validator/expire-date";

@Component({
	selector: "b2b-client-profile-add-payment-dialog",
	templateUrl: "./client-profile-add-payment-modal.component.html",
	styleUrls: ["./client-profile-add-payment-modal.component.scss"],
})
export class ClientProfileAddPaymentDialogComponent implements OnInit {
	public readonly formGroup = this._formBuilder.group({
		cardNum: ["", [Validators.required, Validators.maxLength(16), Validators.minLength(16), onlyNumber()]],
		expDate: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4), expireDate()]],
		cardCode: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(3), onlyNumber()]],
	});

	public readonly b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	constructor(
		private readonly _formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<ClientProfileAddPaymentDialogComponent>
	) {}

	ngOnInit(): void {}

	submit(formValue: any) {
		if (this.formGroup.invalid) {
			return;
		}
		this.dialogRef.close(formValue.value);
	}
}
