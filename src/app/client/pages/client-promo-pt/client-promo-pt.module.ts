import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientPromoPtRoutingModule } from "./client-promo-pt-routing.module";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ClientPromoPtComponent } from "./layout/client-promo-pt.component";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientPromoPtComponent],
	imports: [
		CommonModule,
		ClientPromoPtRoutingModule,
		B2bNgxSkeletonModule,
		B2bNgxImageModule,
		B2bNgxButtonModule,
		B2bNgxIconModule,
		TranslocoModule,
	],
})
export class ClientPromoPtModule {}
