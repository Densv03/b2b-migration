import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientBlogComponent } from "./layout/client-blog.component";

const routes: Routes = [
	{
		path: "",
		component: ClientBlogComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientBlogRoutingModule {}
