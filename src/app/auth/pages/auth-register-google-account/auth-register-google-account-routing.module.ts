import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthRegisterGoogleAccountComponent } from "./layout/auth-register-google-account.component";

const routes: Routes = [
	{
		path: "",
		component: AuthRegisterGoogleAccountComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRegisterGoogleAccountRoutingModule {}
