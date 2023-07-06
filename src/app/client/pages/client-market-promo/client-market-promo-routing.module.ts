import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientMarketPromoComponent} from "./layout/client-market-promo.component";

const routes: Routes = [
	{
		path: '',
		component: ClientMarketPromoComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientMarketPromoRoutingModule { }
