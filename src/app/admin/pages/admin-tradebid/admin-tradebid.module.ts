import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminTradebidRoutingModule } from "./admin-tradebid-routing.module";
import { AdminTradebidComponent } from "./layout/admin-tradebid.component";
import { AdminOffersListModule } from "../admin-offers/components/admin-offers-list/admin-offers-list.module";
import { B2bNgxPaginationModule } from "@b2b/ngx-pagination";
import { AdminOfferDeclineDialogModule } from "../admin-offers/components/admin-offer-decline-dialog/admin-offer-decline-dialog.module";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
	declarations: [AdminTradebidComponent],
	imports: [
		CommonModule,
		AdminTradebidRoutingModule,
		AdminOffersListModule,
		B2bNgxPaginationModule,
		AdminOfferDeclineDialogModule,
		MatDialogModule,
	],
})
export class AdminTradebidModule {}
