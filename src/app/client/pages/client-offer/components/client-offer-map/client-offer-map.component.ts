import { Component, OnInit } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { DialogRef } from "@ngneat/dialog";

@Component({
	selector: "b2b-client-offer-map",
	templateUrl: "./client-offer-map.component.html",
	styleUrls: ["./client-offer-map.component.scss"],
})
export class ClientOfferMapComponent {
	isAuth: string;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	constructor(public ref: DialogRef) {
		this.isAuth = localStorage.getItem("token");
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	}
}
