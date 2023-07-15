import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {ClientProfileSettingsComponent} from "./layout/client-profile-settings.component";

const routes: Routes = [
	{
		path: "",
		component: ClientProfileSettingsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientProfileSettingsRoutingModule {}
