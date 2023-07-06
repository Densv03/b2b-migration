import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientProfileMarketplaceComponent } from "./layout/client-profile-marketplace.component";
import { ClientProfileMarketplaceEditProductComponent } from "./components/client-profile-marketplace-edit-product/client-profile-marketplace-edit-product.component";
import { AuthGuard } from "../../../../../auth/guards/auth/auth.guard";
import { CompanyInformationGuard } from "../../../../../auth/guards/companyInformation/company-information.guard";

const routes: Routes = [
	{
		path: "",
		component: ClientProfileMarketplaceComponent,
	},
	{
		path: "edit/:id",
		component: ClientProfileMarketplaceEditProductComponent,
		canActivate: [CompanyInformationGuard],
	},
	{
		path: "chat/:id",
		canActivate: [AuthGuard],
		loadChildren: () => import("./components/client-chat/client-chat.module").then((m) => m.ClientChatModule),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientProfileMarketplaceRoutingModule {}
