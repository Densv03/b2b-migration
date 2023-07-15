import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientProfileTradebidComponent } from "./layout/client-profile-tradebid.component";

const routes: Routes = [
	{
		path: "",
		component: ClientProfileTradebidComponent,
		children: [
			{
				path: "",
        pathMatch: "full",
				redirectTo: "my-rfq",
			},
			{
				path: "my-rfq",
				loadChildren: () =>
					import("./client-profile-tradebid-rfq/client-profile-tradebid-rfq.module").then(
						(m) => m.ClientProfileTradebidRfqModule
					),
			},
			{
				path: "my-quotation",
				loadChildren: () =>
					import("./client-profile-tradebid-quotation/client-profile-tradebid-quotation.module").then(
						(m) => m.ClientProfileTradebidQuotationModule
					),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientProfileTradebidRoutingModule {}
