import { NgModule } from "@angular/core";
import { ChatsItemComponent } from "./chats-item.component";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { B2bNgxDropdownModule } from "@b2b/ngx-dropdown";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxButtonModule } from "@b2b/ngx-button";

@NgModule({
	declarations: [ChatsItemComponent],
	exports: [ChatsItemComponent],
	imports: [CommonModule, B2bNgxImageModule, RouterModule, B2bNgxDropdownModule, B2bNgxIconModule, B2bNgxButtonModule],
})
export class ChatsItemModule {}
