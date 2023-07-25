import { DialogRef } from "@angular/cdk/dialog";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
	selector: "b2b-client-offer-contact-supplier",
	templateUrl: "./client-offer-contact-supplier.component.html",
	styleUrls: ["./client-offer-contact-supplier.component.scss"],
})
export class ClientOfferContactSupplierComponent {
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private readonly _router: Router, private readonly dialogRef: MatDialogRef<ClientOfferContactSupplierComponent>) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	}

	public contactSupplier(): void {
		this._router.navigateByUrl("/offers/" + this.data._id + "/chat");
		this.dialogRef.close();
	}

	public close(): void {
		this.dialogRef.close();
	}
}
