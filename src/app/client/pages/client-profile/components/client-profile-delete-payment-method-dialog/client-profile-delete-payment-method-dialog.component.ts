import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";

@Component({
	selector: "b2b-client-profile-delete-payment-method-dialog",
	templateUrl: "./client-profile-delete-payment-method-dialog.component.html",
	styleUrls: ["./client-profile-delete-payment-method-dialog.component.scss"],
})
export class ClientProfileDeletePaymentMethodDialogComponent implements OnInit {
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	constructor(private dialogRef: MatDialogRef<ClientProfileDeletePaymentMethodDialogComponent>) {}

	ngOnInit(): void {}

	public delete(): void {
		this.dialogRef.close(true);
	}

	public close(): void {
		this.dialogRef.close();
	}
}
