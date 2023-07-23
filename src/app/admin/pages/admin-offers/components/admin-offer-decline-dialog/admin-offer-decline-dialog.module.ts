import { NgModule } from "@angular/core";
import { AdminOfferDeclineDialogComponent } from "./layout/admin-offer-decline-dialog.component";
import { CommonModule } from "@angular/common";
import { AdminOffersRoutingModule } from "../../admin-offers-routing.module";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [AdminOfferDeclineDialogComponent],
	exports: [AdminOfferDeclineDialogComponent],
	imports: [CommonModule, AdminOffersRoutingModule, B2bNgxButtonModule, ReactiveFormsModule],
})
export class AdminOfferDeclineDialogModule {}
