import { Component } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslocoService } from "@ngneat/transloco";
import { UntilDestroy } from "@ngneat/until-destroy";
import { ApiService } from "../../../../../core/services/api/api.service";
import {MatDialogRef} from "@angular/material/dialog";

@UntilDestroy()
@Component({
	selector: "b2b-client-profile-delete-payment-method",
	templateUrl: "./client-profile-delete-payment-method.component.html",
	styleUrls: ["./client-profile-delete-payment-method.component.scss"],
})
export class ClientProfileDeletePaymentMethodComponent {
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	constructor(
		public dialogRef: MatDialogRef<ClientProfileDeletePaymentMethodComponent>,
		private readonly _apiService: ApiService,
		private readonly _hotToastService: HotToastService,
		private readonly _translocoService: TranslocoService
	) {}

	delete() {
		this.dialogRef.close(true);
	}

	close() {
		this.dialogRef.close();
	}

	// ngOnInit(): void {
	// this.formGroup.patchValue(this.ref.data);
	// }

	// submit() {
	// if (this.formGroup.invalid) {
	// return;
	// }

	// this._apiService.post('authorize-net/create-customer-profile', {
	// 	hashData: CryptoJS.AES.encrypt(JSON.stringify(this.formGroup.value), 'vDS8h!ds#32df').toString()
	// }).pipe(
	// 	untilDestroyed(this),
	// 	this._hotToastService.observe({
	// 		loading: this._translocoService.translate("TOASTR.LOADING"),
	// 		success: this._translocoService.translate("TOASTR.SUCCESS"),
	// 		error: this._translocoService.translate("TOASTR.FAILED"),
	// 	})
	// ).subscribe((response) => {
	// })

	// this.ref.close(this.formGroup.value);
	// }
}
