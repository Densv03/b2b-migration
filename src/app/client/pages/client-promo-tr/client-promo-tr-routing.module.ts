import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientPromoTrComponent } from "./layout/client-promo-tr.component";

const routes: Routes = [
	{
		path: "",
		component: ClientPromoTrComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientPromoTrRoutingModule {}
