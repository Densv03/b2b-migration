import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminArticleComponent } from "./layout/admin-article.component";

const routes: Routes = [
	{
		path: "",
		component: AdminArticleComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminArticleRoutingModule {}
