import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientProfileMyOffersComponent } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-my-offers/layout/client-profile-my-offers.component";

const routes: Routes = [
	{
		path: "",
		component: ClientProfileMyOffersComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientProfileMyOffersRoutingModule {}
