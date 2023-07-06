import { NgModule } from "@angular/core";
import { ClientMarketplaceListingGridComponent } from "./client-marketplace-listing-grid.component";
import { CommonModule } from "@angular/common";
import {
	ClientMarketplaceProductItemModule
} from "../client-marketplace-product-item/client-marketplace-product-item.module";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";

@NgModule({
	declarations: [ClientMarketplaceListingGridComponent],
	exports: [ClientMarketplaceListingGridComponent],
	imports: [CommonModule, ClientMarketplaceProductItemModule, B2bNgxSkeletonModule]
})

export class ClientMarketplaceListingGridModule {}
