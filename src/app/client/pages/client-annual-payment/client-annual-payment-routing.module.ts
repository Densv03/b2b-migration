import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAnnualPaymentComponent } from './layout/client-annual-payment.component';

const routes: Routes = [
  {
    path: '',
    component: ClientAnnualPaymentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientAnnualPaymentRoutingModule {}
