import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientProfileTradebidRfqRoutingModule } from "./client-profile-tradebid-rfq-routing.module";
import { ClientProfileTradebidChatsComponent } from "./components/client-profile-tradebid-chats/client-profile-tradebid-chats.component";
import { ClientProfileTradebidManageRfqComponent } from "./components/client-profile-tradebid-manage-rfq/client-profile-tradebid-manage-rfq.component";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { RfqButtonsComponent } from "./shared/components/rfq-buttons/rfq-buttons.component";
import { ClientProfileTradebidArchivedComponent } from "./components/client-profile-tradebid-archived/client-profile-tradebid-archived.component";
import { ProductDescriptionItemComponent } from "./shared/components/product-description-item/product-description-item.component";
import { ChatsItemModule } from "../shared/chats-item/chats-item.module";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { B2bNgxTextareaModule } from "@b2b/ngx-textarea";
import { B2bNgxFileModule } from "@b2b/ngx-file";
import { ChangeRfqFormComponent } from "./components/change-rfq-form/change-rfq-form.component";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
import { B2bNgxCheckboxModule } from "@b2b/ngx-checkbox";

@NgModule({
	declarations: [
		ClientProfileTradebidChatsComponent,
		ClientProfileTradebidManageRfqComponent,
		ClientProfileTradebidArchivedComponent,
		ProductDescriptionItemComponent,
		RfqButtonsComponent,
		ChangeRfqFormComponent,
	],
	exports: [
		ClientProfileTradebidChatsComponent,
		ClientProfileTradebidManageRfqComponent,
		ClientProfileTradebidArchivedComponent,
		ProductDescriptionItemComponent,
		RfqButtonsComponent,
		ChangeRfqFormComponent,
	],
	imports: [
		CommonModule,
		ClientProfileTradebidRfqRoutingModule,
		ChatsItemModule,
		B2bNgxButtonModule,
		B2bNgxImageModule,
		ReactiveFormsModule,
		B2bNgxInputModule,
		B2bNgxSelectModule,
		B2bNgxTextareaModule,
		B2bNgxFileModule,
		B2bNgxCountrySelectModule,
		B2bNgxCheckboxModule,
	],
})
export class ClientProfileTradebidRfqModule {}
