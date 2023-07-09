import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientContactUsComponent } from "./layout/client-contact-us.component";

const routes: Routes = [
	{
		path: "",
		component: ClientContactUsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientContactUsRoutingModule {}
