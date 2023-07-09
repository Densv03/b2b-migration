import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientAnnualSucceededComponent } from "./layout/client-annual-succeeded.component";

const routes: Routes = [
	{
		path: "",
		component: ClientAnnualSucceededComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientAnnualSucceededRouting {}
