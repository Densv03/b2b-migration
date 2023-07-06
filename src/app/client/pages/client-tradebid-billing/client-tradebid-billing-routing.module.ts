import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientTradebidBillingComponent } from "./layout/client-tradebid-billing.component";

const routes: Routes = [
	{
		path: "",
		component: ClientTradebidBillingComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientTradebidBillingRoutingModule {}
