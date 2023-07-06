import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientAnnualPaymentComponent } from "apps/site/src/app/client/pages/client-annual-payment/layout/client-annual-payment.component";

const routes: Routes = [
	{
		path: "",
		component: ClientAnnualPaymentComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientAnnualPaymentRoutingModule {}
