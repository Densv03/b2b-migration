import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientProfileTradebidQuotationRoutingModule } from "./client-profile-tradebid-quotation-routing.module";
import { ClientProfileTradebidQuotationComponent } from "./layout/client-profile-tradebid-quotation.component";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { ChatsItemModule } from "../shared/chats-item/chats-item.module";
import { MatTabsModule } from "@angular/material/tabs";
import { B2bNgxPaginationModule } from "@b2b/ngx-pagination";

@NgModule({
	declarations: [ClientProfileTradebidQuotationComponent],
	exports: [],
	imports: [
		CommonModule,
		ClientProfileTradebidQuotationRoutingModule,
		ChatsItemModule,
		B2bNgxImageModule,
		B2bNgxButtonModule,
		MatTabsModule,
		B2bNgxPaginationModule,
	],
})
export class ClientProfileTradebidQuotationModule {}
