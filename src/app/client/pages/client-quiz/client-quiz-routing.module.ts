import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientQuizComponent } from "./layout/client-quiz.component";

const routes: Routes = [
	{
		path: "",
		component: ClientQuizComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientQuizRoutingModule {}
