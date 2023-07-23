import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientTradingWikiRoutingModule } from "./client-trading-wiki-routing.module";
import { ClientTradingWikiComponent } from "apps/site/src/app/client/pages/client-trading-wiki/layout/client-trading-wiki.component";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ReactiveFormsModule } from "@angular/forms";
import { ClientTradingWikiListComponent } from "./components/client-trading-wiki-list/client-trading-wiki-list.component";
import { TreeviewModule } from "@b2b/ngx-treeview";
import { B2bNgxPaginationModule } from "@b2b/ngx-pagination";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientTradingWikiComponent, ClientTradingWikiListComponent],
	imports: [
		CommonModule,
		ClientTradingWikiRoutingModule,
		ReactiveFormsModule,
		B2bNgxInputModule,
		B2bNgxButtonModule,
		B2bNgxSkeletonModule,
		B2bNgxLinkModule,
		B2bNgxIconModule,
    TreeviewModule,
		B2bNgxPaginationModule,
		B2bNgxImageModule,
		B2bNgxCountrySelectModule,
		B2bNgxSelectModule,
		TranslocoModule,
	],
})
export class ClientTradingWikiModule {}
