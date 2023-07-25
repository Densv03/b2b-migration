import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientCookiePolicyRoutingModule } from "./client-cookie-policy-routing.module";
import { ClientCookiePolicyComponent } from "./layout/client-cookie-policy.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientCookiePolicyComponent],
	imports: [CommonModule, ClientCookiePolicyRoutingModule,
		NgxDatatableModule,
		TranslocoModule],
})
export class ClientCookiePolicyModule {}
