import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientPromoArComponent } from "./layout/client-promo-ar.component";

const routes: Routes = [
	{
		path: "",
		component: ClientPromoArComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientPromoArRoutingModule {}
