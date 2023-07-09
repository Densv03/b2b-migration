import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthLogInComponent} from "./layout/auth-log-in.component";

const routes: Routes = [
	{
		path: "",
		component: AuthLogInComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthLogInRoutingModule {}
