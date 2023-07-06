import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientHomeOldComponent } from "./layout/client-home.component";

const routes: Routes = [
	{
		path: "",
		component: ClientHomeOldComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientHomeOldRoutingModule {}
