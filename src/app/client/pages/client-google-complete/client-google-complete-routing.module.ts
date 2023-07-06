import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientGoogleCompleteComponent } from "./layout/client-google-complete.component";

const routes: Routes = [
	{
		path: "",
		component: ClientGoogleCompleteComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientGoogleCompleteRoutingModule {}
