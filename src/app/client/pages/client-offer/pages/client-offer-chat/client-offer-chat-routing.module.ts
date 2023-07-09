import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientOfferChatComponent } from "apps/site/src/app/client/pages/client-offer/pages/client-offer-chat/layout/client-offer-chat.component";

const routes: Routes = [
	{
		path: "",
		component: ClientOfferChatComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientOfferChatRoutingModule {}
