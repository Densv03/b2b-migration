import {Component, Inject} from "@angular/core";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {OffersService} from "../../../../../../services/offers/offers.service";
import {DocumentPreviewModel} from "../../../../../../../core/models/document-preview.model";

@UntilDestroy()
@Component({
  selector: "b2b-client-profile-my-offer-mark-as-sold",
  templateUrl: "./client-profile-my-offer-mark-as-sold.component.html",
  styleUrls: ["./client-profile-my-offer-mark-as-sold.component.scss"],
})
export class ClientProfileMyOfferMarkAsSoldComponent {
  public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

  formControl: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: any },
    private readonly matDialogRef: MatDialogRef<ClientProfileMyOfferMarkAsSoldComponent>,
    private readonly _offersService: OffersService) {
    this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
    this.formControl = new FormControl();
  }

  markAsSoldOffer(ev: { preventDefault: () => void; stopImmediatePropagation: () => void; }) {
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
