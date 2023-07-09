import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientHowItWorks3Component } from "./layout/client-how-it-works-3.component";

const routes: Routes = [
	{
		path: "",
		component: ClientHowItWorks3Component,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientHowItWorks3RoutingModule {}
