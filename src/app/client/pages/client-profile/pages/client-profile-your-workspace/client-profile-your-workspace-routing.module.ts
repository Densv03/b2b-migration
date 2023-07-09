import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ClientProfileYourWorkspaceComponent } from "./layout/client-profile-your-workspace.component";
import { DefaultRoleGuard } from "../../../../../auth/guards/defaultRole/deafult-role.guard";
import {BuyerGuard} from "../../../../../auth/guards/buyer/buyer.guard";

const routes: Routes = [
	{
		path: "",
		component: ClientProfileYourWorkspaceComponent,
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: "tradebid",
			},
			{
				path: "tradebid",
				canActivate: [DefaultRoleGuard],
				loadChildren: () =>
					import("../client-profile-tradebid/client-profile-tradebid.module").then(
						(m) => m.ClientProfileTradebidModule
					),
			},
			{
				path: "b2bmarket",
				loadChildren: () =>
					import("../client-profile-marketplace/client-profile-marketplace.module").then(
						(m) => m.ClientProfileMarketplaceModule
					)
			},
			{
				path: "unclaimed-cargo",
				canActivate: [DefaultRoleGuard],
				loadChildren: () =>
					import("../client-profile-unclaimed-cargo/client-profile-unclaimed-cargo.module").then(
						(m) => m.ClientProfileUnclaimedCargoModule
					),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientProfileYourWorkspaceRoutingModule {}
