import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { TranslocoModule } from "@ngneat/transloco";
import { ClientPromoInRoutingModule } from "./client-promo-in-routing.module";
import { ClientPromoInComponent } from "./layout/client-promo-in.component";

@NgModule({
	declarations: [ClientPromoInComponent],
	imports: [
		CommonModule,
		ClientPromoInRoutingModule,
		B2bNgxSkeletonModule,
		B2bNgxImageModule,
		B2bNgxButtonModule,
		B2bNgxIconModule,
		TranslocoModule,
	],
})
export class ClientPromoInModule {}
