import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthConfirmEmailComponent} from "../auth-confirm-email/layout/auth-confirm-email.component";
import { AuthGoogleComponent } from "./layout/auth-google.component";

const routes: Routes = [
	{
		path: "",
		component: AuthGoogleComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthGoogleRoutingModuleModule {}
