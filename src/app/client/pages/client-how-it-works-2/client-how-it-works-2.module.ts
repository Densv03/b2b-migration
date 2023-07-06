import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientHowItWorks2RoutingModule } from "./client-how-it-works-2-routing.module";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ClientHowItWorks2Component } from "./layout/client-how-it-works-2.component";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientHowItWorks2Component],
	imports: [
		CommonModule,
		ClientHowItWorks2RoutingModule,
		B2bNgxSkeletonModule,
		B2bNgxImageModule,
		B2bNgxButtonModule,
		B2bNgxIconModule,
		TranslocoModule,
	],
})
export class ClientHowItWorks2Module {}
