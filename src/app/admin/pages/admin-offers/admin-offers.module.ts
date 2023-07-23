import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxDropdownModule } from "@b2b/ngx-dropdown";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { B2bNgxPaginationModule } from "@b2b/ngx-pagination";
import { AdminOffersRoutingModule } from "./admin-offers-routing.module";
import { AdminOfferChatsDialogComponent } from "./components/admin-offer-chats-dialog/admin-offer-chats-dialog.component";
import { AdminOffersComponent } from "./layout/admin-offers.component";
import { AdminOffersListModule } from "./components/admin-offers-list/admin-offers-list.module";
import { AdminOfferDeclineDialogModule } from "./components/admin-offer-decline-dialog/admin-offer-decline-dialog.module";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
	declarations: [AdminOffersComponent, AdminOfferChatsDialogComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AdminOffersRoutingModule,
		B2bNgxButtonModule,
		B2bNgxIconModule,
		B2bNgxImageModule,
		B2bNgxPaginationModule,
		B2bNgxDropdownModule,
		B2bNgxLinkModule,
		AdminOffersListModule,
		AdminOfferDeclineDialogModule,
		MatDialogModule,
	],
})
export class AdminOffersModule {}
