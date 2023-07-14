import {Component, Inject} from "@angular/core";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OffersService} from "../../../../../../services/offers/offers.service";

@UntilDestroy()
@Component({
  selector: "b2b-client-profile-my-offer-delete",
  templateUrl: "./client-profile-my-offer-delete.component.html",
  styleUrls: ["./client-profile-my-offer-delete.component.scss"],
})
export class ClientProfileMyOfferDeleteComponent {
  public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

  formControl: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: any },
    private readonly matDialogRef: MatDialogRef<ClientProfileMyOfferDeleteComponent>,
    private readonly _offersService: OffersService
  ) {
    this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
    this.formControl = new FormControl();
  }

  deleteOffer(ev: { preventDefault: () => void; stopImmediatePropagation: () => void; }) {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    const body = {
      reasonForDeletion: this.formControl.value,
    };

    this._offersService
      .deleteOfferById(this.data.id, {body})
      .pipe(untilDestroyed(this))
      .subscribe(() => this.matDialogRef.close());
  }
}
