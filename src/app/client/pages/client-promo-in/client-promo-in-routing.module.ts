import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientPromoInComponent } from "./layout/client-promo-in.component";

const routes: Routes = [
	{
		path: "",
		component: ClientPromoInComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientPromoInRoutingModule {}
