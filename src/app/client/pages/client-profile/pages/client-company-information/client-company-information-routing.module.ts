import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientCompanyInformationComponent } from "./layout/client-company-information.component";

const routes: Routes = [
	{
		path: "",
		component: ClientCompanyInformationComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientCompanyInformationRoutingModule {}
