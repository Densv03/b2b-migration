import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientTradingWikiArticleComponent } from './layout/client-trading-wiki-article.component';

const routes: Routes = [
  {
    path: '',
    component: ClientTradingWikiArticleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientTradingWikiArticleRoutingModule {}
