import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminArticlesRoutingModule } from "./admin-articles-routing.module";
import { AdminArticlesComponent } from "./layout/admin-articles.component";
import { AdminArticlesListComponent } from "./components/admin-articles-list/admin-articles-list.component";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxPaginationModule } from "@b2b/ngx-pagination";
import { B2bNgxDropdownModule } from "@b2b/ngx-dropdown";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxButtonModule } from "@b2b/ngx-button";

@NgModule({
	declarations: [AdminArticlesComponent, AdminArticlesListComponent],
	imports: [
		CommonModule,
		AdminArticlesRoutingModule,
		B2bNgxLinkModule,
		B2bNgxImageModule,
		B2bNgxPaginationModule,
		B2bNgxDropdownModule,
		B2bNgxIconModule,
		B2bNgxButtonModule,
	],
})
export class AdminArticlesModule {}
