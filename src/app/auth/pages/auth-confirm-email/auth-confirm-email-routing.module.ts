import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthConfirmEmailComponent} from "./layout/auth-confirm-email.component";

const routes: Routes = [
	{
		path: "",
		component: AuthConfirmEmailComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthConfirmEmailRoutingModule {}
