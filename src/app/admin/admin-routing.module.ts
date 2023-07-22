import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./layout/admin.component";
import { ClientTradeBidAddRfqComponent } from "../client/pages/client-tradebid/client-tradebid-add-rfq/client-trade-bid-add-rfq.component";
import { CompanyInformationGuard } from "../auth/guards/companyInformation/company-information.guard";

const routes: Routes = [
	{
		path: "",
		component: AdminComponent,
		children: [
			{
				path: "articles",
				loadChildren: () => import("./pages/admin-articles/admin-articles.module").then((m) => m.AdminArticlesModule),
			},
			{
				path: "articles/:id",
				loadChildren: () => import("./pages/admin-article/admin-article.module").then((m) => m.AdminArticleModule),
			},
			{
				path: "article-categories",
				loadChildren: () =>
					import("./pages/admin-article-categories/admin-article-categories.module").then(
						(m) => m.AdminArticleCategoriesModule
					),
			},
			{
				path: "blog",
				loadChildren: () => import("./pages/admin-blog/admin-blog.module").then((m) => m.AdminBlogModule),
			},
			{
				path: "blog/:id",
				loadChildren: () => import("./pages/admin-blog-post/admin-blog-post.module").then((m) => m.AdminBlogPostModule),
			},
			{
				path: "users",
				loadChildren: () => import("./pages/admin-users/admin-users.module").then((m) => m.AdminUsersModule),
			},
			{
				path: "users/:id",
				loadChildren: () =>
					import("../client/pages/client-profile/pages/client-profile-settings/client-profile-settings.module").then(
						(m) => m.ClientProfileSettingsModule
					),
			},
			{
				path: "offers",
				loadChildren: () => import("./pages/admin-offers/admin-offers.module").then((m) => m.AdminOffersModule),
			},
			{
				path: "offers/:id",
				loadChildren: () =>
					import("../client/pages/client-profile/pages/client-profile-add-offer/client-profile-add-offer.module").then(
						(m) => m.ClientProfileAddOfferModule
					),
			},
			{
				path: "offer",
				loadChildren: () => import("./pages/admin-offer/admin-offer.module").then((m) => m.AdminOfferModule),
				canActivate: [CompanyInformationGuard],
			},
			{
				path: "offer-categories",
				loadChildren: () =>
					import("./pages/admin-offer-categories/admin-offer-categories.module").then(
						(m) => m.AdminOfferCategoriesModule
					),
			},
			{
				path: "tradebid",
				loadChildren: () => import("./pages/admin-tradebid/admin-tradebid.module").then((m) => m.AdminTradebidModule),
			},
			{
				path: "b2bmarket",
				loadChildren: () =>
					import("./pages/admin-marketplace/admin-marketplace.module").then((m) => m.AdminMarketplaceModule),
			},
			{
				path: "tradebid/:id",
				component: ClientTradeBidAddRfqComponent,
				// loadChildren: () =>
				// 	import("../client/pages/client-tradebid/client-tradebid-listing/client-tradebid-quotation-form/client-tradebid-quotation-form.module")
				// 		.then(m => m.ClientTradebidQuotationFormModule)
			},
			{
				path: "manager",
				loadChildren: () => import("./pages/admin-manager/admin-manager.module").then((m) => m.AdminManagerModule),
			},
			{
				path: "billing",
				loadChildren: () => import("./pages/admin-billing/admin-billing.module").then((m) => m.AdminBillingModule),
			},
			{
				path: "companies",
				loadChildren: () =>
					import("./pages/admin-companies/admin-companies.module").then((m) => m.AdminCompaniesModule),
			},
			{
				path: "homepage",
				loadChildren: () => import("./pages/admin-homepage/admin-homepage.module").then((m) => m.AdminHomepageModule),
			},
			{
				path: "",
        pathMatch: "full",
				redirectTo: "users",
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
