import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {ClientNotFoundComponent} from "./layout/client-not-found.component";

const routes: Routes = [
	{
		path: "",
		component: ClientNotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientNotFoundRoutingModule {}
