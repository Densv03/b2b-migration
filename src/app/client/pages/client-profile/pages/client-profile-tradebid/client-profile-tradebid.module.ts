import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientProfileTradebidRoutingModule } from "./client-profile-tradebid-routing.module";
import { ClientProfileTradebidComponent } from "./layout/client-profile-tradebid.component";
import { ClientProfileTradebidRfqComponent } from "./client-profile-tradebid-rfq/layout/client-profile-tradebid-rfq.component";
import { ClientProfileTradebidRfqModule } from "./client-profile-tradebid-rfq/client-profile-tradebid-rfq.module";
import { MatTabsModule } from "@angular/material/tabs";
import { ClientProfileTradebidQuotationModule } from "./client-profile-tradebid-quotation/client-profile-tradebid-quotation.module";
import { B2bNgxButtonModule } from "@b2b/ngx-button";

@NgModule({
	declarations: [ClientProfileTradebidComponent, ClientProfileTradebidRfqComponent],
	exports: [],
	imports: [
		CommonModule,
		ClientProfileTradebidRoutingModule,
		ClientProfileTradebidRfqModule,
		ClientProfileTradebidQuotationModule,
		MatTabsModule,
		B2bNgxButtonModule,
	],
})
export class ClientProfileTradebidModule {}
