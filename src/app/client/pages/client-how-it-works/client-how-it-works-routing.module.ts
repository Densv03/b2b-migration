import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientHowItWorksComponent } from "apps/site/src/app/client/pages/client-how-it-works/layout/client-how-it-works.component";

const routes: Routes = [
	{
		path: "",
		component: ClientHowItWorksComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientHowItWorksRoutingModule {}
