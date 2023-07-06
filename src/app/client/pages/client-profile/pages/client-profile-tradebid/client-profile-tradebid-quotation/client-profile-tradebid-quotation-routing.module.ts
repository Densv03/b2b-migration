import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientProfileTradebidQuotationComponent } from "./layout/client-profile-tradebid-quotation.component";

const routes: Routes = [
	{
		path: "",
		component: ClientProfileTradebidQuotationComponent,
	},
	{
		path: "chat/:id",
		loadChildren: () =>
			import("../client-profile-tradebid-rfq/components/client-chat/client-chat.module").then(
				(m) => m.ClientChatModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientProfileTradebidQuotationRoutingModule {}
