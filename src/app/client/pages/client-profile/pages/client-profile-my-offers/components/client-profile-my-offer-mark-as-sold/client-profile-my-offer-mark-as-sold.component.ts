import { Component } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { DialogRef } from "@ngneat/dialog";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { OffersService } from "apps/site/src/app/client/services/offers/offers.service";

@UntilDestroy()
@Component({
	selector: "b2b-client-profile-my-offer-mark-as-sold",
	templateUrl: "./client-profile-my-offer-mark-as-sold.component.html",
	styleUrls: ["./client-profile-my-offer-mark-as-sold.component.scss"],
})
export class ClientProfileMyOfferMarkAsSoldComponent {
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	formControl: FormControl;

	constructor(public ref: DialogRef, private readonly _offersService: OffersService) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.formControl = new FormControl();
	}

	markAsSoldOffer(ev) {
		ev.preventDefault();
		ev.stopImmediatePropagation();
		const body = {
			reasonForDeletion: this.formControl.value,
		};

		this._offersService
			.deleteOfferById(this.ref.data.id, { body })
			.pipe(untilDestroyed(this))
			.subscribe(() => this.ref.close());
	}
}
