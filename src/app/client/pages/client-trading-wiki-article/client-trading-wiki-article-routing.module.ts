import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientTradingWikiArticleComponent } from "apps/site/src/app/client/pages/client-trading-wiki-article/layout/client-trading-wiki-article.component";

const routes: Routes = [
	{
		path: "",
		component: ClientTradingWikiArticleComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientTradingWikiArticleRoutingModule {}
