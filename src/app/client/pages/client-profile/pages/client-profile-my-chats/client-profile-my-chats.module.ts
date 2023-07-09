import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { B2bNgxChatsListModule } from "@b2b/ngx-chats-list";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { ClientProfileMyChatsComponent } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-my-chats/layout/client-profile-my-chats.component";
import { ClientProfileMyChatsRoutingModule } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-my-chats/client-profile-my-chats-routing.module";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientProfileMyChatsComponent],
	exports: [ClientProfileMyChatsComponent],
	imports: [
		CommonModule,
		ClientProfileMyChatsRoutingModule,
		B2bNgxChatsListModule,
		B2bNgxSkeletonModule,
		B2bNgxLinkModule,
		TranslocoModule,
	],
})
export class ClientProfileMyChatsModule {}
