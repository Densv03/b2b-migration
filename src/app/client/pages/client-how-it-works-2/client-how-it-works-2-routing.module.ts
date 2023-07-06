import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientHowItWorks2Component } from "./layout/client-how-it-works-2.component";

const routes: Routes = [
	{
		path: "",
		component: ClientHowItWorks2Component,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientHowItWorks2RoutingModule {}
