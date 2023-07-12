import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientProfileAddOfferRoutingModule} from "./client-profile-add-offer-routing.module";
import { ClientProfileAddOfferComponent} from "./layout/client-profile-add-offer.component";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxToggleModule } from "@b2b/ngx-toggle";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { B2bNgxCheckboxModule } from "@b2b/ngx-checkbox";
// import { B2bNgxFileModule } from "@b2b/ngx-file";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxTextareaModule } from "@b2b/ngx-textarea";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxTelModule } from "@b2b/ngx-tel";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
// import { ErrorTailorModule } from "@ngneat/error-tailor";
// import { DialogModule } from "@ngneat/dialog";
import { ClientProfileAddOfferDialogComponent } from "./components/client-profile-add-offer-dialog/client-profile-add-offer-dialog.component";
import { B2bNgxRadioModule } from "@b2b/ngx-radio";
import { B2bScrollToInvalidControl } from "../../../../../core/directives/scroll-to-invalid-control.directive";
import { TranslocoModule } from "@ngneat/transloco";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import {B2bNgxFileModule} from "../../../../../../../projects/ngx-file/src";

@NgModule({
	declarations: [ClientProfileAddOfferComponent, ClientProfileAddOfferDialogComponent, B2bScrollToInvalidControl],
  imports: [
    CommonModule,
    ClientProfileAddOfferRoutingModule,
    ReactiveFormsModule,
    // ErrorTailorModule,
    B2bNgxInputModule,
    B2bNgxToggleModule,
    B2bNgxSelectModule,
    B2bNgxCheckboxModule,
    // B2bNgxFileModule,
    // B2bNgxButtonModule,
    B2bNgxTextareaModule,
    B2bNgxTelModule,
    B2bNgxCountrySelectModule,
    B2bNgxIconModule,
    // DialogModule,
    B2bNgxFileModule,
    B2bNgxRadioModule,
    TranslocoModule,
    B2bNgxButtonModule,
  ],
})
export class ClientProfileAddOfferModule {}
