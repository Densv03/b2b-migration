import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientProfileSettingsRoutingModule } from "./client-profile-settings-routing.module";
import { ClientProfileSettingsComponent } from "apps/site/src/app/client/pages/client-profile/pages/client-profile-settings/layout/client-profile-settings.component";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxTelModule } from "@b2b/ngx-tel";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { B2bNgxSocialMediasModule } from "@b2b/ngx-social-medias";
import { B2bNgxChipsModule } from "@b2b/ngx-chips";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
// import { ErrorTailorModule } from "@ngneat/error-tailor";
import { B2bNgxTreeviewModule } from "@b2b/ngx-treeview";
import { TranslocoModule } from "@ngneat/transloco";
import { B2bNgxFileModule } from "@b2b/ngx-file";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
	declarations: [ClientProfileSettingsComponent],
	imports: [
		CommonModule,
		ClientProfileSettingsRoutingModule,
		ReactiveFormsModule,
		// ErrorTailorModule,
		B2bNgxInputModule,
		B2bNgxSelectModule,
		B2bNgxTelModule,
		B2bNgxSocialMediasModule,
		B2bNgxChipsModule,
		B2bNgxButtonModule,
		B2bNgxCountrySelectModule,
		B2bNgxTreeviewModule,
		TranslocoModule,
		B2bNgxFileModule,
		B2bNgxIconModule,
		MatDialogModule,
	],
})
export class ClientProfileSettingsModule {}
