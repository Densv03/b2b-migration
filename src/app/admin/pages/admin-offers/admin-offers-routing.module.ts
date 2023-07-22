import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminOffersComponent } from "./layout/admin-offers.component";

const routes: Routes = [
	{
		path: "",
		component: AdminOffersComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminOffersRoutingModule {}
