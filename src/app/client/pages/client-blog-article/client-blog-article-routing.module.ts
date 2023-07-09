import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientBlogArticleComponent } from "./layout/client-blog-article.component";

const routes: Routes = [
	{
		path: "",
		component: ClientBlogArticleComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientBlogArticleRoutingModule {}
