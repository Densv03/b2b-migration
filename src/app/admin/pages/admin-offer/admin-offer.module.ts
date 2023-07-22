import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminOfferRoutingModule } from "./admin-offer-routing.module";
import { AdminOfferComponent } from "./layout/admin-offer.component";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [AdminOfferComponent],
	imports: [CommonModule, AdminOfferRoutingModule, TranslocoModule],
})
export class AdminOfferModule {}
