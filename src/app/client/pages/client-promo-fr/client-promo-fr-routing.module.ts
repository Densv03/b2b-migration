import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientPromoFrComponent } from "./layout/client-promo-fr.component";

const routes: Routes = [
	{
		path: "",
		component: ClientPromoFrComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientPromoFrRoutingModule {}
