import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientRegistrationCompleteComponent } from "./layout/client-registration-complete.component";

const routes: Routes = [
	{
		path: "",
		component: ClientRegistrationCompleteComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientRegistrationCompleteRoutingModule {}
