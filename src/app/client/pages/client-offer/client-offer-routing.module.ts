import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfChatGuard } from './guards/self-chat/self-chat.guard';
import { ClientOfferComponent } from './layout/client-offer.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ClientOfferComponent,
  },
  {
    path: 'chat',
    canActivate: [SelfChatGuard],
    loadChildren: () =>
      import('./pages/client-offer-chat/client-offer-chat.module').then(
        (m) => m.ClientOfferChatModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientOfferRoutingModule {}
