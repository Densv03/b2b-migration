import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientProfileMyChatsComponent } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-my-chats/layout/client-profile-my-chats.component";

const routes: Routes = [
	{
		path: "",
		component: ClientProfileMyChatsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientProfileMyChatsRoutingModule {}
