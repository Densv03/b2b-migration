import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientPromoEspRoutingModule } from "./client-promo-esp-routing.module";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ClientPromoEspComponent } from "./layout/client-promo-esp.component";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientPromoEspComponent],
	imports: [
		CommonModule,
		ClientPromoEspRoutingModule,
		B2bNgxSkeletonModule,
		B2bNgxImageModule,
		B2bNgxButtonModule,
		B2bNgxIconModule,
		TranslocoModule,
	],
})
export class ClientPromoEspModule {}
