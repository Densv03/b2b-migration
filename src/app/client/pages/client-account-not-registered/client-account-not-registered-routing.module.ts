import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientAccountNotRegisteredComponent } from "./layout/client-account-not-registered.component";

const routes: Routes = [
	{
		path: "",
		component: ClientAccountNotRegisteredComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientAccountNotRegisteredRoutingModule {}
