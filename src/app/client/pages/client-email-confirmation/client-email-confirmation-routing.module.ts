import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientEmailConfirmationComponent } from "./layout/client-email-confirmation.component";

const routes: Routes = [
	{
		path: ":id",
		component: ClientEmailConfirmationComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientEmailConfirmationRoutingModule {}
