import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientPromoVtRoutingModule } from "./client-promo-vt-routing.module";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ClientPromoVtComponent } from "./layout/client-promo-vt.component";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientPromoVtComponent],
	imports: [
		CommonModule,
		ClientPromoVtRoutingModule,
		B2bNgxSkeletonModule,
		B2bNgxImageModule,
		B2bNgxButtonModule,
		B2bNgxIconModule,
		TranslocoModule,
	],
})
export class ClientPromoVtModule {}
