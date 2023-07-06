import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { B2bNgxTextareaModule } from "@b2b/ngx-textarea";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ClientOfferChatComponent } from "apps/site/src/app/client/pages/client-offer/pages/client-offer-chat/layout/client-offer-chat.component";
import { ClientOfferChatRoutingModule } from "apps/site/src/app/client/pages/client-offer/pages/client-offer-chat/client-offer-chat-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientOfferChatComponent],
	imports: [
		CommonModule,
		ClientOfferChatRoutingModule,
		ReactiveFormsModule,
		B2bNgxTextareaModule,
		B2bNgxButtonModule,
		B2bNgxImageModule,
		B2bNgxIconModule,
		TranslocoModule,
	],
})
export class ClientOfferChatModule {}
