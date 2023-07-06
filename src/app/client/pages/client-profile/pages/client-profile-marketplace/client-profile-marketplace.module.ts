import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientProfileMarketplaceRoutingModule } from "./client-profile-marketplace-routing.module";
import { ClientProfileMarketplaceComponent } from "./layout/client-profile-marketplace.component";
import { ClientProfileMarketplaceChatsComponent } from "./components/client-profile-marketplace-chats/client-profile-marketplace-chats.component";
import { ClientProfileMarketplaceProductsComponent } from "./components/client-profile-marketplace-products/client-profile-marketplace-products.component";
import { ClientProfileMarketplaceArchiveComponent } from "./components/client-profile-marketplace-archive/client-profile-marketplace-archive.component";
import { MatTabsModule } from "@angular/material/tabs";
import { B2bNgxPaginationModule } from "@b2b/ngx-pagination";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { ClientProfileMarketplaceEditProductComponent } from "./components/client-profile-marketplace-edit-product/client-profile-marketplace-edit-product.component";
import { ClientProfileTradebidRfqModule } from "../client-profile-tradebid/client-profile-tradebid-rfq/client-profile-tradebid-rfq.module";
import { ClientProfileMarketplaceProductItemComponent } from "./components/client-profile-marketplace-product-item/client-profile-marketplace-product-item.component";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxDropdownModule } from "@b2b/ngx-dropdown";
import { DeleteProductModalComponent } from "./components/delete-product-modal/delete-product-modal.component";
import { B2bNgxRadioModule } from "@b2b/ngx-radio";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { ChatsItemModule } from "../client-profile-tradebid/shared/chats-item/chats-item.module";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { ClientProfileMarketplaceEditProductModule } from "./components/client-profile-marketplace-edit-product/client-profile-marketplace-edit-product.module";
import {B2bNgxSelectModule} from "@b2b/ngx-select";

@NgModule({
	declarations: [
		ClientProfileMarketplaceComponent,
		ClientProfileMarketplaceChatsComponent,
		ClientProfileMarketplaceProductsComponent,
		ClientProfileMarketplaceArchiveComponent,
		ClientProfileMarketplaceProductItemComponent,
		DeleteProductModalComponent,
	],
    imports: [
        CommonModule,
        ClientProfileMarketplaceRoutingModule,
        MatTabsModule,
        B2bNgxPaginationModule,
        B2bNgxButtonModule,
        ClientProfileTradebidRfqModule,
        B2bNgxImageModule,
        B2bNgxIconModule,
        B2bNgxDropdownModule,
        B2bNgxRadioModule,
        ReactiveFormsModule,
        MatDialogModule,
        ChatsItemModule,
        B2bNgxSkeletonModule,
        ClientProfileMarketplaceEditProductModule,
        B2bNgxSelectModule,
    ],
})
export class ClientProfileMarketplaceModule {}
