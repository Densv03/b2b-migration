import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { B2bNgxChatsListModule } from '@b2b/ngx-chats-list';
import { B2bNgxSkeletonModule } from '@b2b/ngx-skeleton';
import { B2bNgxLinkModule } from '@b2b/ngx-link';
import { TranslocoModule } from '@ngneat/transloco';
import { ClientProfileMyOfferChatsRoutingModule } from './client-profile-my-offer-chats-routing.module';
import { ClientProfileMyOfferChatsComponent } from './layout/client-profile-my-offer-chats.component';

@NgModule({
  declarations: [ClientProfileMyOfferChatsComponent],
  imports: [
    CommonModule,
    ClientProfileMyOfferChatsRoutingModule,
    B2bNgxChatsListModule,
    B2bNgxSkeletonModule,
    B2bNgxLinkModule,
    TranslocoModule,
  ],
})
export class ClientProfileMyOfferChatsModule {}
