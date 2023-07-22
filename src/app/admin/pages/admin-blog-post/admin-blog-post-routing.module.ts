import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminBlogPostComponent } from "./layout/admin-blog-post.component";

const routes: Routes = [
	{
		path: "",
		component: AdminBlogPostComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminBlogPostRoutingModule {}
