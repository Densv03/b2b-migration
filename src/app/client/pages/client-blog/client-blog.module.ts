import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientBlogRoutingModule } from "./client-blog-routing.module";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ReactiveFormsModule } from "@angular/forms";
// import { B2bNgxTreeviewModule } from "@b2b/ngx-treeview";
import { B2bNgxPaginationModule } from "@b2b/ngx-pagination";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { TranslocoModule } from "@ngneat/transloco";
import { ClientBlogListComponent } from "./client-trading-wiki-list/client-blog-list.component";
import { ClientBlogComponent } from "./layout/client-blog.component";
import {PaginationModule} from "../../shared/components/pagination/pagination.module";
import { ClientBlogListItemComponent } from './client-trading-wiki-list/components/client-blog-list-item/client-blog-list-item.component';

@NgModule({
	declarations: [ClientBlogComponent, ClientBlogListComponent, ClientBlogListItemComponent],
    imports: [
        CommonModule,
        ClientBlogRoutingModule,
        ReactiveFormsModule,
        B2bNgxInputModule,
        B2bNgxButtonModule,
        B2bNgxSkeletonModule,
        B2bNgxLinkModule,
        B2bNgxIconModule,
        // B2bNgxTreeviewModule,
        B2bNgxPaginationModule,
        B2bNgxImageModule,
        B2bNgxCountrySelectModule,
        B2bNgxSelectModule,
        TranslocoModule,
        PaginationModule,
    ],
})
export class ClientBlogModule {}
