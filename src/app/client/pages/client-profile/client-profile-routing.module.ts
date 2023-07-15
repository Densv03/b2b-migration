import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DefaultRoleGuard } from "../../../auth/guards/defaultRole/deafult-role.guard";
import { MyOfferGuard } from "./guards/myOffer/myOffer.guard";
import {ClientProfileComponent} from "./layout/client-profile.component";

const routes: Routes = [
	{
		path: "",
		component: ClientProfileComponent,
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: "your-account",
			},
			{
				path: "your-account",
				loadChildren: () =>
					import("./pages/client-profile-your-account/client-profile-your-account.module").then(
						(m) => m.ClientProfileYourAccountModule
					),
			},
			{
				path: "your-workspace",
				loadChildren: () =>
					import("./pages/client-profile-your-workspace/client-profile-your-workspace.module").then(
						(m) => m.ClientProfileYourWorkspaceModule
					),
			},
			{
				path: "my-offers/:id",
				canActivate: [MyOfferGuard, DefaultRoleGuard],
				loadChildren: () =>
					import("./pages/client-profile-add-offer/client-profile-add-offer.module").then(
						(m) => m.ClientProfileAddOfferModule
					),
			},
			// {
			// 	path: "my-chats",
			// 	canActivate: [DefaultRoleGuard],
			// 	loadChildren: () =>
			// 		import("./pages/client-profile-my-chats/client-profile-my-chats.module").then(
			// 			(m) => m.ClientProfileMyChatsModule
			// 		),
			// },
			{
				path: "my-offers",
				canActivate: [DefaultRoleGuard],
				loadChildren: () =>
					import("./pages/client-profile-my-offers/client-profile-my-offers.module").then(
						(m) => m.ClientProfileMyOffersModule
					),
			},
			// {
			// 	path: "my-offers/:id/chats",
			// 	canActivate: [DefaultRoleGuard],
			// 	loadChildren: () =>
			// 		import("./pages/client-profile-my-offer-chats/client-profile-my-offer-chats.module").then(
			// 			(m) => m.ClientProfileMyOfferChatsModule
			// 		),
			// },
			// {
			// 	path: "saved-offers",
			// 	canActivate: [DefaultRoleGuard],
			// 	loadChildren: () =>
			// 		import("./pages/client-profile-saved-offers/client-profile-saved-offers.module").then(
			// 			(m) => m.ClientProfileSavedOffersModule
			// 		),
			// },
			// {
			// 	path: "settings",
			// 	loadChildren: () =>
			// 		import("./pages/client-profile-settings/client-profile-settings.module").then(
			// 			(m) => m.ClientProfileSettingsModule
			// 		),
			// },
			// {
			// 	path: "billing",
			// 	canActivate: [DefaultRoleGuard],
			// 	loadChildren: () =>
			// 		import("./pages/client-profile-billing/client-profile-billing.module").then(
			// 			(m) => m.ClientProfileBillingModule
			// 		),
			// },
			// {
			// 	path: 'tradebid',
			// 	canActivate: [DefaultRoleGuard],
			// 	loadChildren: () => import('./pages/client-profile-tradebid/client-profile-tradebid.module').then(
			// 		m => m.ClientProfileTradebidModule)
			// }
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientProfileRoutingModule {}
