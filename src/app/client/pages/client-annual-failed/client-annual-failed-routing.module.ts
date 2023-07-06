import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientAnnualFailedComponent } from "./layout/client-annual-failed.component";

const routes: Routes = [
	{
		path: "",
		component: ClientAnnualFailedComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientAnnualFailedRoutingModule {}
