import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientPromoPtComponent } from "./layout/client-promo-pt.component";

const routes: Routes = [
	{
		path: "",
		component: ClientPromoPtComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientPromoPtRoutingModule {}
