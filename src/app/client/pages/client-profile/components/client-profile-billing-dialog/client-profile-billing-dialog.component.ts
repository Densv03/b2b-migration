import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { onlyNumber } from "../../../../../core/helpers/validator/only-number";
import { onlyLatin } from "../../../../../core/helpers/validator/only-latin";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";
import { FormBuilder } from "@ngneat/reactive-forms";
import { DialogRef } from "@ngneat/dialog";
import { ApiService } from "../../../../../core/services/api/api.service";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslocoService } from "@ngneat/transloco";
import { MatDialogRef } from "@angular/material/dialog";
import { onlyLatinAndNumberAndSymbols } from "../../../../../core/helpers/validator/only -latin-numbers-symbols";

@Component({
	selector: "b2b-client-profile-billing-dialog",
	templateUrl: "./client-profile-billing-dialog.component.html",
	styleUrls: ["./client-profile-billing-dialog.component.scss"],
})
export class ClientProfileBillingDialogComponent implements OnInit {
	public readonly formGroup = this._formBuilder.group({
		cardNum: ["", [Validators.required, Validators.maxLength(16), Validators.minLength(16), onlyNumber()]],
		email: ["", [Validators.required, Validators.email]],
		expDate: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
		postCode: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(6), onlyNumber()]],
		cardCode: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(3), onlyNumber()]],
		state: [null, [Validators.required]],
		address: ["", [Validators.required, onlyLatinAndNumberAndSymbols()]],
		city: ["", [Validators.required, onlyLatin()]],
	});

	public readonly b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public readonly b2bNgxSelectnThemeEnum = B2bNgxSelectThemeEnum;

	constructor(
		private readonly _formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<ClientProfileBillingDialogComponent>,
		private readonly _translocoService: TranslocoService
	) {}

	ngOnInit(): void {}
	submit(formValue: any) {
		if (this.formGroup.invalid) {
			return;
		}
		this.dialogRef.close(formValue.value);
	}
}
