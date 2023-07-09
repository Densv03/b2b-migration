import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGoogleSignInSuccessComponent } from "./layout/auth-google-sign-in-success.component";

const routes: Routes = [
	{
		path: "",
		component: AuthGoogleSignInSuccessComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthGoogleSignInSuccessRoutingModule {}
