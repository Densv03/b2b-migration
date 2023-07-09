import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientProfileSavedOffersRoutingModule } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-saved-offers/client-profile-saved-offers-routing.module";
import { ClientProfileSavedOffersComponent } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-saved-offers/layout/client-profile-saved-offers.component";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { ClientProfileSavedOffersListComponent } from "./components/client-profile-saved-offers-list/client-profile-saved-offers-list.component";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxDropdownModule } from "@b2b/ngx-dropdown";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { NgxTippyModule } from "ngx-tippy-wrapper";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientProfileSavedOffersComponent, ClientProfileSavedOffersListComponent],
	exports: [ClientProfileSavedOffersComponent, ClientProfileSavedOffersListComponent],
	imports: [
		CommonModule,
		ClientProfileSavedOffersRoutingModule,
		B2bNgxSkeletonModule,
		B2bNgxImageModule,
		B2bNgxIconModule,
		B2bNgxDropdownModule,
		B2bNgxButtonModule,
		B2bNgxLinkModule,
		NgxTippyModule,
		TranslocoModule,
	],
})
export class ClientProfileSavedOffersModule {}
