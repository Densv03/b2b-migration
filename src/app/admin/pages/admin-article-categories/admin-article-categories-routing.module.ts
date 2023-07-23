import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminArticleCategoriesComponent } from "./layout/admin-article-categories.component";

const routes: Routes = [
	{
		path: "",
		component: AdminArticleCategoriesComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminArticleCategoriesRoutingModule {}
