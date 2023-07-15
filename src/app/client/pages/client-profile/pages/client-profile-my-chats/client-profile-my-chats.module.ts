import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { B2bNgxChatsListModule } from "@b2b/ngx-chats-list";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { TranslocoModule } from "@ngneat/transloco";
import {ClientProfileMyChatsComponent} from "./layout/client-profile-my-chats.component";
import {ClientProfileMyChatsRoutingModule} from "./client-profile-my-chats-routing.module";

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
