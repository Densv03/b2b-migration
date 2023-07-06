import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { B2bNgxChatsListModule } from "@b2b/ngx-chats-list";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { ClientProfileMyOfferChatsComponent } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-my-offer-chats/layout/client-profile-my-offer-chats.component";
import { ClientProfileMyOfferChatsRoutingModule } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-my-offer-chats/client-profile-my-offer-chats-routing.module";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { TranslocoModule } from "@ngneat/transloco";

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
