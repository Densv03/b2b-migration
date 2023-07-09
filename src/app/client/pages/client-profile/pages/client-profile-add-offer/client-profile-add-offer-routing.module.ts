import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientProfileAddOfferComponent } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-add-offer/layout/client-profile-add-offer.component";

const routes: Routes = [
	{
		path: "",
		component: ClientProfileAddOfferComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientProfileAddOfferRoutingModule {}
