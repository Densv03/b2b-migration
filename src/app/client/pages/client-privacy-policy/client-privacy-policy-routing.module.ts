import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientPrivacyPolicyComponent } from "./layout/client-privacy-policy.component";

const routes: Routes = [
	{
		path: "",
		component: ClientPrivacyPolicyComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientPrivacyPolicyRoutingModule {}
