import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientResetPasswordRoutingModule } from "./client-reset-password-routing.module";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { ClientResetPasswordComponent } from "./layout/client-reset-password.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { ErrorTailorModule } from "@ngneat/error-tailor";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientResetPasswordComponent],
	imports: [
		CommonModule,
		ClientResetPasswordRoutingModule,
		B2bNgxImageModule,
		B2bNgxButtonModule,
		B2bNgxLinkModule,
		FormsModule,
		ReactiveFormsModule,
		// ErrorTailorModule,
		B2bNgxInputModule,
		TranslocoModule,
	],
})
export class ClientResetPasswordModule {}
