import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientSeanQuizComponent } from "./layout/client-sean-quiz.component";

const routes: Routes = [
	{
		path: "",
		component: ClientSeanQuizComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientSeanQuizRoutingModule {}
