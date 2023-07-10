import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent} from "./layout/auth.component";
// import { SelectedRoleGuard } from "apps/site/src/app/auth/guards/selectedRole/selectedRole.guard";

const routes: Routes = [
	{
		path: "",
		component: AuthComponent,
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: "register-credentials",
			},
			{
				path: "confirm-email",
				loadChildren: () =>
					import("./pages/auth-confirm-email/auth-confirm-email.module").then((m) => m.AuthConfirmEmailModule),
			},
			{
				path: "log-in",
				loadChildren: () => import("./pages/auth-log-in/auth-log-in.module").then((m) => m.AuthLogInModule),
			},
			{
				path: 'register',
				loadChildren: () =>
					import('./pages/auth-register/auth-register.module').then(m => m.AuthRegisterModule)
			},
			{
				path: 'register-credentials',
				loadChildren: () =>
					import('./pages/auth-enter-credentials/auth-enter-credentials.module').then(m => m.AuthEnterCredentialsModule)
			},
			{
				path: "register-individual-account",
				// canActivate: [SelectedRoleGuard],
				loadChildren: () =>
					import("./pages/auth-register-individual-account/auth-register-individual-account.module").then(
						(m) => m.AuthRegisterIndividualAccountModule
					),
			},
			{
				path: "register-google-account",
				loadChildren: () =>
					import("./pages/auth-register-google-account/auth-register-google-account.module").then(
						(m) => m.AuthRegisterGoogleAccountModule
					),
			},
			{
				path: "register-linkedin-account",
				loadChildren: () =>
					import("./pages/auth-register-google-account/auth-register-google-account.module").then(
						(m) => m.AuthRegisterGoogleAccountModule
					),
			},
			{
				path: "google-sign-in-success",
				loadChildren: () =>
					import("./pages/auth-google-sign-in-success/auth-google-sign-in-success.module").then(
						(m) => m.AuthGoogleSignInSuccessModule
					),
			},
			// {
			// 	path: "join-us",
			// 	loadChildren: () => import("./pages/auth-join-us/auth-join-us.module").then((m) => m.AuthJoinUsModule),
			// },
			{
				path: "google/:id",
				loadChildren: () => import("./pages/auth-google/auth-google.module").then((m) => m.AuthGoogleModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
