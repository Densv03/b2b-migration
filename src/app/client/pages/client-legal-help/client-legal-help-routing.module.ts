import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientLegalHelpComponent } from "apps/site/src/app/client/pages/client-legal-help/layout/client-legal-help.component";

const routes: Routes = [
	{
		path: "",
		component: ClientLegalHelpComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientLegalHelpRoutingModule {}
