import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientTermsAndConditionsComponent } from "./layout/client-terms-and-conditions.component";

const routes: Routes = [
	{
		path: "",
		component: ClientTermsAndConditionsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientTermsAndConditionsRoutingModule {}
