import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthLogInRoutingModule } from "../auth-log-in/auth-log-in-routing.module";
import { AuthLogInComponent } from "apps/site/src/app/auth/pages/auth-log-in/layout/auth-log-in.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { B2bNgxDividerModule } from "libs/ngx-divider/src";
import { B2bNgxInputModule } from "libs/ngx-input/src";
import { B2bNgxButtonModule } from "libs/ngx-button/src";
import { B2bNgxLinkModule } from "libs/ngx-link/src";
import { ErrorTailorModule } from "@ngneat/error-tailor";
import { AuthResetPasswordModalComponent } from "../auth-log-in/components/auth-reset-password-modal/auth-reset-password-modal.component";
import { TranslocoModule } from "@ngneat/transloco";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { AuthRecoverAccountComponent } from "./auth-recover-account.module";

@NgModule({
	declarations: [AuthLogInComponent, AuthResetPasswordModalComponent, AuthRecoverAccountComponent],
	imports: [
		CommonModule,
		AuthLogInRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		ErrorTailorModule,
		B2bNgxInputModule,
		B2bNgxButtonModule,
		B2bNgxDividerModule,
		B2bNgxLinkModule,
		B2bNgxImageModule,
		TranslocoModule,
	],
})
export class AuthLogInModule {}
