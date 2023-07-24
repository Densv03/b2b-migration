import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientProfileMyOfferChatsComponent } from './layout/client-profile-my-offer-chats.component';

const routes: Routes = [
  {
    path: '',
    component: ClientProfileMyOfferChatsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientProfileMyOfferChatsRoutingModule {}
