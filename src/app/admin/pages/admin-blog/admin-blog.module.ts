import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxDropdownModule } from "@b2b/ngx-dropdown";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { B2bNgxPaginationModule } from "@b2b/ngx-pagination";
import { AdminBlogRoutingModule } from "./admin-blog-routing.module";
import { AdminBlogListComponent } from "./components/admin-articles-list/admin-blog-list.component";
import { AdminBlogComponent } from "./layout/admin-blog.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
	declarations: [AdminBlogComponent, AdminBlogListComponent],
	imports: [
		CommonModule,
		AdminBlogRoutingModule,
		B2bNgxLinkModule,
		B2bNgxImageModule,
		B2bNgxPaginationModule,
		B2bNgxDropdownModule,
		B2bNgxIconModule,
		B2bNgxButtonModule,
		MatDialogModule,
	],
})
export class AdminBlogModule {}
