import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ClientProfileYourAccountComponent } from "./layout/client-profile-your-account.component";
import { DefaultRoleGuard } from "../../../../../auth/guards/defaultRole/deafult-role.guard";

const routes: Routes = [
	{
		path: "",
		component: ClientProfileYourAccountComponent,
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: "settings",
			},
			{
				path: "settings",
				canActivate: [DefaultRoleGuard],
				loadChildren: () =>
					import("../client-profile-settings/client-profile-settings.module").then(
						(m) => m.ClientProfileSettingsModule
					),
			},
			{
				path: "company-information",
				loadChildren: () =>
					import("../client-company-information/client-company-information.module").then(
						(m) => m.ClientCompanyInformationModule
					),
			},
			{
				path: "billing",
				canActivate: [DefaultRoleGuard],
				loadChildren: () =>
					import("../client-profile-billing/client-profile-billing.module").then((m) => m.ClientProfileBillingModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientProfileYourAccountRoutingModule {}
