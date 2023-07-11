import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientProfileRoutingModule} from 'src/app/client/pages/client-profile/client-profile-routing.module'
import {ClientProfileComponent} from 'src/app/client/pages/client-profile/layout/client-profile.component'
import { RouterModule } from "@angular/router";
import { ClientProfileSidenavComponent } from "./components/client-profile-sidenav/client-profile-sidenav.component";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { TranslocoModule } from "@ngneat/transloco";
import { ClientProfileUpgradePlanComponent } from "./components/client-profile-upgrade-plan/client-profile-upgrade-plan.component";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClientProfileDeleteAccountComponent } from "./components/client-profile-delete-account/client-profile-delete-account.component";
import { B2bNgxRadioModule } from "@b2b/ngx";
import { ClientCreatePaymnetInfoModalComponent } from "./components/client-create-paymnet-info-modal/client-create-paymnet-info-modal.component";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
import { ClientProfileBillingDialogComponent } from "./components/client-profile-billing-dialog/client-profile-billing-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ClientProfileAddPaymentDialogComponent } from "./components/client-profile-add-payment-dialog/client-profile-add-payment-modal.component";
import { ClientProfileDeletePaymentMethodDialogComponent } from "./components/client-profile-delete-payment-method-dialog/client-profile-delete-payment-method-dialog.component";

@NgModule({
	declarations: [
		ClientProfileComponent,
		ClientProfileSidenavComponent,
		ClientProfileUpgradePlanComponent,
		ClientProfileDeleteAccountComponent,
		ClientCreatePaymnetInfoModalComponent,
		ClientProfileBillingDialogComponent,
		ClientProfileAddPaymentDialogComponent,
		ClientProfileDeletePaymentMethodDialogComponent,
	],
	imports: [
		CommonModule,
		ClientProfileRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		B2bNgxImageModule,
		B2bNgxIconModule,
		B2bNgxInputModule,
		B2bNgxButtonModule,
		B2bNgxLinkModule,
		TranslocoModule,
		B2bNgxRadioModule,
		B2bNgxCountrySelectModule,
		MatDialogModule,
	],
})
export class ClientProfileModule {}
