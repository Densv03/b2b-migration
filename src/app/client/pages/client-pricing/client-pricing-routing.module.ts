import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientPricingComponent } from './layout/client-pricing.component';

const routes: Routes = [
  {
    path: '',
    component: ClientPricingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPricingRoutingModule {}
