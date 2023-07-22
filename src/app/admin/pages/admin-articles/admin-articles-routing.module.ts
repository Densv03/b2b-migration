import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminArticlesComponent } from "./layout/admin-articles.component";

const routes: Routes = [
	{
		path: "",
		component: AdminArticlesComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminArticlesRoutingModule {}
