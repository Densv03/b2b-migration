import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProductsComponent } from "./company-products.component";
// import { B2bNgxPaginationModule } from "@b2b/ngx-pagination";
import {
	ClientMarketplaceListingGridModule
} from "../../../../components/client-marketplace-listing-grid/client-marketplace-listing-grid.module";
import {B2bNgxPaginationModule} from "@b2b/ngx-pagination";



@NgModule({
	declarations: [CompanyProductsComponent],
	exports: [
		CompanyProductsComponent
	],
	imports: [
		CommonModule,
		ClientMarketplaceListingGridModule,
    B2bNgxPaginationModule
	]
})
export class MarketCompanyProductsModule { }
