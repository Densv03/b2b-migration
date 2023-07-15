import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslocoService } from "@ngneat/transloco";
import { UntilDestroy } from "@ngneat/until-destroy";
import { ApiService } from "../../../../../core/services/api/api.service";
import { onlyNumber } from "../../../../../core/helpers/validator/only-number";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@UntilDestroy()
@Component({
	selector: "b2b-client-profile-add-payment-method",
	templateUrl: "./client-profile-add-payment-method.component.html",
	styleUrls: ["./client-profile-add-payment-method.component.scss"],
})
export class ClientProfileAddPaymentMethodComponent implements OnInit {
	public readonly formGroup = this._formBuilder.group({
		cardNum: ["", [Validators.required, Validators.maxLength(16), Validators.minLength(16), onlyNumber()]],
		expDate: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
		cardCode: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(3), onlyNumber()]],
	});

	public readonly b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
		private readonly _formBuilder: FormBuilder,
		public matDialogRef: MatDialogRef<ClientProfileAddPaymentMethodComponent>,
		private readonly _apiService: ApiService,
		private readonly _hotToastService: HotToastService,
		private readonly _translocoService: TranslocoService
	) {}

	ngOnInit(): void {
		this.formGroup.patchValue(this.data.data);
	}

	submit() {
		if (this.formGroup.invalid) {
			return;
		}

		this.matDialogRef.close(this.formGroup.value);
	}
}
