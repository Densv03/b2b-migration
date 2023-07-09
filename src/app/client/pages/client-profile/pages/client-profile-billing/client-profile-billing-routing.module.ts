import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientProfileBillingComponent } from "./layout/client-profile-billing.component";

const routes: Routes = [
	{
		path: "",
		component: ClientProfileBillingComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientProfileBillingRoutingModule {}
