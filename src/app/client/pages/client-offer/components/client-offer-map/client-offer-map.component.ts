import { Component, Inject, OnInit } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { DialogRef } from "@angular/cdk/dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
	selector: "b2b-client-offer-map",
	templateUrl: "./client-offer-map.component.html",
	styleUrls: ["./client-offer-map.component.scss"],
})
export class ClientOfferMapComponent {
	public isAuth: string;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ClientOfferMapComponent>) {
		this.isAuth = localStorage.getItem("token");
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	}
	
	public close(): void {
		this.dialogRef.close();
	}
}
