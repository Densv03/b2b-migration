import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientProfileTradebidRfqComponent } from "./layout/client-profile-tradebid-rfq.component";
import { ChangeRfqFormComponent } from "./components/change-rfq-form/change-rfq-form.component";

const routes: Routes = [
	{
		path: "",
		component: ClientProfileTradebidRfqComponent,
	},
	{
		path: "chat/:id",
		loadChildren: () => import("./components/client-chat/client-chat.module").then((m) => m.ClientChatModule),
	},
	{
		path: "change-rfq/:id",
		component: ChangeRfqFormComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientProfileTradebidRfqRoutingModule {}
