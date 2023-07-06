import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientLatestOffersComponent } from "apps/site/src/app/client/pages/client-latest-offers/layout/client-latest-offers.component";

const routes: Routes = [
	{
		path: "",
		component: ClientLatestOffersComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientLatestOffersRoutingModule {}
