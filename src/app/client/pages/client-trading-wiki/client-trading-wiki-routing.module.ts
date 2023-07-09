import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientTradingWikiComponent } from "apps/site/src/app/client/pages/client-trading-wiki/layout/client-trading-wiki.component";

const routes: Routes = [
	{
		path: "",
		component: ClientTradingWikiComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientTradingWikiRoutingModule {}
