import { NgModule } from "@angular/core";
import { AdminMarketplaceComponent } from "./admin-marketplace.component";
import { AdminMarketplaceRoutingModule } from "./admin-marketplace-routing.module";
import { B2bNgxPaginationModule } from "@b2b/ngx-pagination";
import { CommonModule } from "@angular/common";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxDropdownModule } from "@b2b/ngx-dropdown";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { AdminSupplierProductListComponent } from "./components/admin-supplier-product-list/admin-supplier-product-list.component";
import {B2bNgxSelectModule} from "@b2b/ngx-select";
import { AdminProductListComponent } from './components/admin-product-list/admin-product-list.component';
import { AdminCompaniesListComponent } from './components/admin-companies-list/admin-companies-list.component';
import {SharedModule} from "@b2b/shared";
import {CategoriesDialogModule} from "@b2b/categories-modal";

@NgModule({
	declarations: [AdminMarketplaceComponent, AdminSupplierProductListComponent, AdminProductListComponent, AdminCompaniesListComponent],
    imports: [
        AdminMarketplaceRoutingModule,
        B2bNgxPaginationModule,
        CommonModule,
        B2bNgxImageModule,
        B2bNgxDropdownModule,
        B2bNgxButtonModule,
        B2bNgxIconModule,
        MatDialogModule,
        SharedModule,
        ReactiveFormsModule,
        B2bNgxInputModule,
        B2bNgxSelectModule,
        CategoriesDialogModule,
    ],
})
export class AdminMarketplaceModule {}
