import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { DialogRef } from "@ngneat/dialog";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
	selector: "b2b-client-offer-contact-supplier",
	templateUrl: "./client-offer-contact-supplier.component.html",
	styleUrls: ["./client-offer-contact-supplier.component.scss"],
})
export class ClientOfferContactSupplierComponent {
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	constructor(public ref: DialogRef, private readonly _router: Router) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	}

	contactSupplier() {
		this._router.navigateByUrl("/offers/" + this.ref.data._id + "/chat");
		this.ref.close();
	}
}
