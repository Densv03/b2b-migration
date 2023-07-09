import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientLegalHelpRoutingModule } from "./client-legal-help-routing.module";
import { ClientLegalHelpComponent } from "apps/site/src/app/client/pages/client-legal-help/layout/client-legal-help.component";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { B2bNgxTelModule } from "@b2b/ngx-tel";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { ErrorTailorModule } from "@ngneat/error-tailor";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxTextareaModule } from "@b2b/ngx-textarea";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientLegalHelpComponent],
	imports: [
		CommonModule,
		ClientLegalHelpRoutingModule,
		B2bNgxIconModule,
		B2bNgxSkeletonModule,
		B2bNgxSelectModule,
		B2bNgxTelModule,
		B2bNgxInputModule,
		FormsModule,
		ReactiveFormsModule,
		// ErrorTailorModule,
		B2bNgxButtonModule,
		B2bNgxTextareaModule,
		B2bNgxCountrySelectModule,
		TranslocoModule,
	],
})
export class ClientLegalHelpModule {}
