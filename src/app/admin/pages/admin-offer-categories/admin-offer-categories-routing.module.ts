import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminOfferCategoriesComponent } from "./layout/admin-offer-categories.component";

const routes: Routes = [
	{
		path: "",
		component: AdminOfferCategoriesComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminOfferCategoriesRoutingModule {}
