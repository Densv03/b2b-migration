import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientProfileSavedOffersComponent } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-saved-offers/layout/client-profile-saved-offers.component";

const routes: Routes = [
	{
		path: "",
		component: ClientProfileSavedOffersComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientProfileSavedOffersRoutingModule {}
