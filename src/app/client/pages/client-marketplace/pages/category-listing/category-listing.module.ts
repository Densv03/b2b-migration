import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { CategoryListingComponent } from "./category-listing.component";
import { B2bNgxPaginationModule } from "@b2b/ngx-pagination";
import { CategoryItemModule } from "./category-item/category-item.module";

const routes: Routes = [{ path: "", component: CategoryListingComponent }];

@NgModule({
	declarations: [CategoryListingComponent],
	imports: [CommonModule, RouterModule.forChild(routes), B2bNgxPaginationModule, CategoryItemModule],
})
export class CategoryListingModule {}
