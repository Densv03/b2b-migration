import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHowItWorksComponent } from './layout/client-how-it-works.component';

const routes: Routes = [
  {
    path: '',
    component: ClientHowItWorksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientHowItWorksRoutingModule {}
