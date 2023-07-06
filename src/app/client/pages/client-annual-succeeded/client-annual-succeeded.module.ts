import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { TranslocoModule } from "@ngneat/transloco";
import { ClientAnnualSucceededRouting } from "./client-annual-succeeded-routing.module";
import { ClientAnnualSucceededComponent } from "./layout/client-annual-succeeded.component";
import { B2bNgxIconModule } from "@b2b/ngx-icon";

@NgModule({
	declarations: [ClientAnnualSucceededComponent],
	imports: [
		CommonModule,
		ClientAnnualSucceededRouting,
		B2bNgxImageModule,
		B2bNgxIconModule,
		B2bNgxButtonModule,
		B2bNgxLinkModule,
		TranslocoModule,
	],
})
export class ClientAnnualSucceededModule {}
