import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthJoinUsComponent } from "apps/site/src/app/auth/pages/auth-join-us/layout/auth-join-us.component";

const routes: Routes = [
	{
		path: "",
		component: AuthJoinUsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthJoinUsRoutingModule {}
