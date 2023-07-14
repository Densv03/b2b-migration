import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {ClientProfileMyChatsComponent} from "./layout/client-profile-my-chats.component";

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
