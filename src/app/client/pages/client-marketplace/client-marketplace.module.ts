import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientMarketplaceRoutingModule } from "./client-marketplace-routing.module";
import { ClientMarketplaceComponent } from "./layout/client-marketplace.component";
import { ClientMarketplaceFiltersComponent } from "./components/client-marketplace-filters/client-marketplace-filters.component";
import { ClientMarketplaceAddProductComponent } from "./components/client-marketplace-add-product/client-marketplace-add-product.component";
import { ClientMarketplaceSupplierListingComponent } from "./components/client-marketplace-supplier-listing/client-marketplace-supplier-listing.component";
import { ClientMarketplaceSupplierFiltersComponent } from "./components/client-marketplace-supplier-filters/client-marketplace-supplier-filters.component";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
// import { CategoriesDialogModule } from "../../../../../../../lib/shared/components/categories-dialog/categories-dialog.module";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { ClientMarketplaceSupplierInfoComponent } from "./components/client-marketplace-supplier-info/client-marketplace-supplier-info.component";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ClientMarketplaceListingListComponent } from "./components/client-marketplace-listing-list/client-marketplace-listing-list.component";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { TranslocoModule } from "@ngneat/transloco";
// import { ErrorTailorModule } from "@ngneat/error-tailor";
import { B2bNgxToggleModule } from "@b2b/ngx-toggle";
import { B2bNgxTextareaModule } from "@b2b/ngx-textarea";
// import { B2bNgxFileModule } from "@b2b/ngx-file";
import { ClientProfileAddOfferModule } from "../client-profile/pages/client-profile-add-offer/client-profile-add-offer.module";
// import { B2bNgxTreeviewModule } from "@b2b/ngx-treeview";
import { B2bNgxMultiselectModule } from "@b2b/ngx-multiselect";
import { ClientMarketplaceProductDetailsComponent } from "./components/client-marketplace-product-details/client-marketplace-product-details.component";
// import { NgxTippyModule } from "ngx-tippy-wrapper";
import { B2bNgxImagesCarouselModule } from "@b2b/ngx-images-carousel";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { LoadMorePaginatorModule } from "./components/load-more-paginator/load-more-paginator.module";
import { MarketplaceCarouselComponent } from "./components/marketplace-carousel/marketplace-carousel.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { B2bNgxCheckboxModule } from "@b2b/ngx-checkbox";
import { ClientMarketplaceFiltersMobileComponent } from "./components/client-marketplace-filters-mobile/client-marketplace-filters-mobile.component";
import {Meta} from "@angular/platform-browser";
import {
	ClientMarketplaceListingGridModule
} from "./components/client-marketplace-listing-grid/client-marketplace-listing-grid.module";
import { ClientMarketCompanyPageModule } from "./pages/client-market-company-page/client-market-company-page.module";
import {
    ClientMarketplaceProductItemModule
} from "./components/client-marketplace-product-item/client-marketplace-product-item.module";
import {B2bNgxPaginationModule} from "@b2b/ngx-pagination";
import {B2bNgxFileModule} from "@b2b/ngx-file";
import {PaginationModule} from "../../shared/components/pagination/pagination.module";
import {CategoriesDialogModule} from "@b2b/categories-modal";
import { B2bBreadcrumpsModule } from "@b2b/breadcrumps";

@NgModule({
	declarations: [
		ClientMarketplaceComponent,
		ClientMarketplaceFiltersComponent,
		ClientMarketplaceAddProductComponent,
		ClientMarketplaceSupplierListingComponent,
		ClientMarketplaceSupplierFiltersComponent,
		ClientMarketplaceSupplierInfoComponent,
		ClientMarketplaceListingListComponent,
		ClientMarketplaceProductDetailsComponent,
		MarketplaceCarouselComponent,
		ClientMarketplaceFiltersMobileComponent,
	],
  imports: [
    CommonModule,
    ClientMarketplaceRoutingModule,
    B2bNgxSelectModule,
    CategoriesDialogModule,
    B2bNgxCountrySelectModule,
    ReactiveFormsModule,
    B2bNgxButtonModule,
    B2bNgxInputModule,
    B2bNgxIconModule,
    B2bNgxLinkModule,
    B2bNgxImageModule,
    TranslocoModule,
    // ErrorTailorModule,
    B2bNgxToggleModule,
    B2bNgxTextareaModule,
    B2bNgxFileModule,
    ClientProfileAddOfferModule,
    // B2bNgxTreeviewModule,
    B2bNgxMultiselectModule,
    // NgxTippyModule,
    B2bNgxImagesCarouselModule,
    B2bNgxPaginationModule,
    B2bNgxSkeletonModule,
    LoadMorePaginatorModule,
    MatExpansionModule,
    B2bNgxCheckboxModule,
    ClientMarketplaceListingGridModule,
    ClientMarketCompanyPageModule,
    ClientMarketplaceProductItemModule,
    B2bNgxPaginationModule,
    PaginationModule,
    B2bBreadcrumpsModule
  ],
	providers: [
		Meta
	]
})
export class ClientMarketplaceModule {}
