import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientPromoEngComponent } from "./layout/client-promo-eng.component";

const routes: Routes = [
	{
		path: "",
		component: ClientPromoEngComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientPromoEngRoutingModule {}
