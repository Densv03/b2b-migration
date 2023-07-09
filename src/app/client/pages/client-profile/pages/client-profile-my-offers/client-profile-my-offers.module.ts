import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { ClientProfileMyOffersRoutingModule } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-my-offers/client-profile-my-offers-routing.module";
import { ClientProfileMyOffersComponent } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-my-offers/layout/client-profile-my-offers.component";
import { ClientProfileMyOffersListComponent } from "./components/client-profile-my-offers-list/client-profile-my-offers-list.component";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxDropdownModule } from "@b2b/ngx-dropdown";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { TranslocoModule } from "@ngneat/transloco";
import { ClientProfileMyOfferDeleteComponent } from "./components/client-profile-my-offer-delete/client-profile-my-offer-delete.component";
import { B2bNgxRadioModule } from "@b2b/ngx-radio";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { ClientProfileMyOfferMarkAsSoldComponent } from "./components/client-profile-my-offer-mark-as-sold/client-profile-my-offer-mark-as-sold.component";
import { ClientBadgeComponent } from "../../../../components/client-badge/client-badge.component";

@NgModule({
	declarations: [
		ClientProfileMyOffersComponent,
		ClientProfileMyOffersListComponent,
		ClientProfileMyOfferDeleteComponent,
		ClientProfileMyOfferMarkAsSoldComponent,
		ClientBadgeComponent,
	],
	exports: [
		ClientProfileMyOffersComponent,
		ClientProfileMyOffersListComponent,
		ClientProfileMyOfferDeleteComponent,
		ClientProfileMyOfferMarkAsSoldComponent,
		ClientBadgeComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ClientProfileMyOffersRoutingModule,
		B2bNgxSkeletonModule,
		B2bNgxImageModule,
		B2bNgxIconModule,
		B2bNgxDropdownModule,
		B2bNgxLinkModule,
		B2bNgxRadioModule,
		B2bNgxButtonModule,
		TranslocoModule,
	],
})
export class ClientProfileMyOffersModule {}
