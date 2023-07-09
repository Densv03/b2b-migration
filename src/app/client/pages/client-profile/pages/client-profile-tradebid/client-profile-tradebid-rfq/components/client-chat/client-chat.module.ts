import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { B2bNgxTextareaModule } from "@b2b/ngx-textarea";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ReactiveFormsModule } from "@angular/forms";
import { ClientChatComponent } from "./layout/client-chat.component";
import { ClientChatRoutingModule } from "./client-chat-routing.module";
import { TranslocoModule } from "@ngneat/transloco";
import { B2bNgxFileModule } from "@b2b/ngx-file";

@NgModule({
	declarations: [ClientChatComponent],
	imports: [
		CommonModule,
		ClientChatRoutingModule,
		ReactiveFormsModule,
		B2bNgxTextareaModule,
		B2bNgxButtonModule,
		B2bNgxImageModule,
		B2bNgxIconModule,
		TranslocoModule,
		B2bNgxFileModule,
	],
})
export class ClientChatModule {}
