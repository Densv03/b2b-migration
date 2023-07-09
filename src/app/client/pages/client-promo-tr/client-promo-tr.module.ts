import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientPromoTrRoutingModule } from "./client-promo-tr-routing.module";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ClientPromoTrComponent } from "./layout/client-promo-tr.component";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientPromoTrComponent],
	imports: [
		CommonModule,
		ClientPromoTrRoutingModule,
		B2bNgxSkeletonModule,
		B2bNgxImageModule,
		B2bNgxButtonModule,
		B2bNgxIconModule,
		TranslocoModule,
	],
})
export class ClientPromoTrModule {}
