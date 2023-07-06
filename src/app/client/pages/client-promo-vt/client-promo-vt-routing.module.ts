import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientPromoVtComponent } from "./layout/client-promo-vt.component";

const routes: Routes = [
	{
		path: "",
		component: ClientPromoVtComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientPromoVtRoutingModule {}
