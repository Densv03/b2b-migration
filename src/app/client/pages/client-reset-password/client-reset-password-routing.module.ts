import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientResetPasswordComponent } from "./layout/client-reset-password.component";

const routes: Routes = [
	{
		path: "",
		component: ClientResetPasswordComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientResetPasswordRoutingModule {}
