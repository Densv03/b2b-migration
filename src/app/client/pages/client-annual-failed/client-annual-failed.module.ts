import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { TranslocoModule } from "@ngneat/transloco";
import { ClientAnnualFailedComponent } from "./layout/client-annual-failed.component";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ClientAnnualFailedRoutingModule } from "./client-annual-failed-routing.module";

@NgModule({
	declarations: [ClientAnnualFailedComponent],
	imports: [
		CommonModule,
		ClientAnnualFailedRoutingModule,
		B2bNgxImageModule,
		B2bNgxIconModule,
		B2bNgxButtonModule,
		B2bNgxLinkModule,
		TranslocoModule,
	],
})
export class ClientAnnualFailedModule {}
