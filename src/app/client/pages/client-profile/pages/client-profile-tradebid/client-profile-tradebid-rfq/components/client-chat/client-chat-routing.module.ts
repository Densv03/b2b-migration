import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientChatComponent } from "./layout/client-chat.component";

const routes: Routes = [
	{
		path: "",
		component: ClientChatComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientChatRoutingModule {}
