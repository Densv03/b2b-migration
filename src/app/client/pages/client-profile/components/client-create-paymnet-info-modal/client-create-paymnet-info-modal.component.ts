import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import { onlyNumber } from "../../../../../core/helpers/validator/only-number";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { ApiService } from "../../../../../core/services/api/api.service";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslocoService } from "@ngneat/transloco";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";
import { onlyLatin } from "../../../../../core/helpers/validator/only-latin";
import { animate, style, transition, trigger } from "@angular/animations";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
	selector: "b2b-client-create-paymnet-info-modal",
	templateUrl: "./client-create-paymnet-info-modal.component.html",
	styleUrls: ["./client-create-paymnet-info-modal.component.scss"],
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
export class ClientCreatePaymnetInfoModalComponent implements OnInit {
	public readonly formGroup = this.formBuilder.group({
		cardNum: ["", [Validators.required, Validators.maxLength(16), Validators.minLength(16), onlyNumber()]],
		email: ["", [Validators.required, Validators.email]],
		expDate: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
		postCode: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(6), onlyNumber()]],
		cardCode: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(3), onlyNumber()]],
		country: [null, [Validators.required]],
		region: ["", [Validators.required, onlyLatin()]],
		city: ["", [Validators.required, onlyLatin()]],
	});

	public readonly b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public readonly b2bNgxSelectnThemeEnum = B2bNgxSelectThemeEnum;

	constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<ClientCreatePaymnetInfoModalComponent>,
		private readonly apiService: ApiService,
		private readonly hotToastService: HotToastService,
		private readonly translocoService: TranslocoService
	) {}

	ngOnInit(): void {
		this.formGroup.patchValue(this.data);
	}

	submit() {
		if (this.formGroup.invalid) {
			return;
		}
		this.dialogRef.close(this.formGroup.value);
	}
}
