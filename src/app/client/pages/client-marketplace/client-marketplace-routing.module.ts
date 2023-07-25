import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientMarketplaceComponent } from "./layout/client-marketplace.component";
import { ClientMarketplaceAddProductComponent } from "./components/client-marketplace-add-product/client-marketplace-add-product.component";
import { ClientMarketplaceSupplierListingComponent } from "./components/client-marketplace-supplier-listing/client-marketplace-supplier-listing.component";
import { ClientMarketplaceProductDetailsComponent } from "./components/client-marketplace-product-details/client-marketplace-product-details.component";
import { CompanyInformationGuard } from "../../../auth/guards/companyInformation/company-information.guard";
import { AuthGuard } from "../../../auth/guards/auth/auth.guard";
import {
	ClientMarketCompanyPageComponent
} from "./pages/client-market-company-page/client-market-company-page.component";
import {BuyerGuard} from "../../../auth/guards/buyer/buyer.guard";

const routes: Routes = [
	{
		path: "",
		loadChildren: () =>
			import('./components/client-marketplace-main/client-marketplace-main.module')
			.then(m => m.ClientMarketplaceMainModule),
	},
	{
		path: "listing",
		component: ClientMarketplaceComponent,
		data: {
			breadcrumbs: [
				{ label: 'Home', url: '/' },
				{ label: 'B2BMARKET', url: '/b2bmarket' },
				{ label: 'OFFERS', url: '/b2bmarket/listing'}
			]
		}

	},
	{
		path: "supplier-listing/:id",
		component: ClientMarketplaceSupplierListingComponent,
	},
	{
		path: "product",
		canActivate: [AuthGuard, CompanyInformationGuard, BuyerGuard],
		component: ClientMarketplaceAddProductComponent,
	},
	{
		path: "product/:id",
		component: ClientMarketplaceAddProductComponent,
	},
	{
		path: "supplier/:id",
		component: ClientMarketplaceSupplierListingComponent,
	},
	{
		path: "products/:id",
		component: ClientMarketplaceProductDetailsComponent,
	},
	{
		path: "category-listing",
		loadChildren: () => import("./pages/category-listing/category-listing.module").then((m) => m.CategoryListingModule),
	},
	{
		path: "company/:id",
		component: ClientMarketCompanyPageComponent
	},
	{
		path: 'product-posting-complete',
		loadChildren: () => import('./components/product-posting-complete/product-posting-complete.module').then( m => m.ProductPostingCompleteModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientMarketplaceRoutingModule {}
