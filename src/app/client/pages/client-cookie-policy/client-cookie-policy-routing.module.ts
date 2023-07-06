import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientCookiePolicyComponent } from "./layout/client-cookie-policy.component";

const routes: Routes = [
	{
		path: "",
		component: ClientCookiePolicyComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientCookiePolicyRoutingModule {}
