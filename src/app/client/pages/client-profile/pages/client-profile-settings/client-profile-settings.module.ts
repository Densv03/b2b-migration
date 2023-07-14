import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientProfileSettingsComponent} from "./layout/client-profile-settings.component";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxTelModule } from "@b2b/ngx-tel";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { B2bNgxSocialMediasModule } from "@b2b/ngx-social-medias";
import {B2bNgxChipsModule} from "@b2b/ngx-chips";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
import { TranslocoModule } from "@ngneat/transloco";
import { B2bNgxFileModule } from "@b2b/ngx-file";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { MatDialogModule } from "@angular/material/dialog";
import {ClientProfileSettingsRoutingModule} from "./client-profile-settings-routing.module";

@NgModule({
	declarations: [ClientProfileSettingsComponent],
	imports: [
		CommonModule,
		ClientProfileSettingsRoutingModule,
		ReactiveFormsModule,
		B2bNgxInputModule,
		B2bNgxSelectModule,
		B2bNgxTelModule,
		B2bNgxSocialMediasModule,
		B2bNgxChipsModule,
		B2bNgxButtonModule,
		B2bNgxCountrySelectModule,
		TranslocoModule,
		B2bNgxFileModule,
		B2bNgxIconModule,
		MatDialogModule,
	],
})
export class ClientProfileSettingsModule {}
