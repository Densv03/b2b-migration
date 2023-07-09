import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientHowItWorksRoutingModule } from "./client-how-it-works-routing.module";
import { ClientHowItWorksComponent } from "apps/site/src/app/client/pages/client-how-it-works/layout/client-how-it-works.component";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientHowItWorksComponent],
	imports: [
		CommonModule,
		ClientHowItWorksRoutingModule,
		B2bNgxSkeletonModule,
		B2bNgxImageModule,
		B2bNgxButtonModule,
		B2bNgxIconModule,
		TranslocoModule,
	],
})
export class ClientHowItWorksModule {}
