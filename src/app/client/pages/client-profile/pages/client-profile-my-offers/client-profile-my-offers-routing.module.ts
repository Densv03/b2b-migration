import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {ClientProfileMyOffersComponent} from "./layout/client-profile-my-offers.component";

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
