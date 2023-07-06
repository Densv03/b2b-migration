import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientPromoEspComponent } from "./layout/client-promo-esp.component";

const routes: Routes = [
	{
		path: "",
		component: ClientPromoEspComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientPromoEspRoutingModule {}
