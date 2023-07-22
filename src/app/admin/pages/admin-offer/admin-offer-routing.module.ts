import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminOfferComponent } from "./layout/admin-offer.component";

const routes: Routes = [
	{
		path: "",
		component: AdminOfferComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminOfferRoutingModule {}
