import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminBlogComponent } from "./layout/admin-blog.component";

const routes: Routes = [
	{
		path: "",
		component: AdminBlogComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminBlogRoutingModule {}
