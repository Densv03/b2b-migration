import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminTradebidComponent } from "./layout/admin-tradebid.component";

const routes: Routes = [
	{
		path: "",
		component: AdminTradebidComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminTradebidRoutingModule {}
