import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthLogInRoutingModule } from "../auth-log-in/auth-log-in-routing.module";
import { AuthLogInComponent} from "../auth-log-in/layout/auth-log-in.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { B2bNgxDividerModule} from "@b2b/ngx-divider";
import { B2bNgxInputModule} from "@b2b/ngx-input";
import { B2bNgxButtonModule} from "@b2b/ngx-button";
import { B2bNgxLinkModule} from "@b2b/ngx-link";
import { AuthResetPasswordModalComponent } from "../auth-log-in/components/auth-reset-password-modal/auth-reset-password-modal.component";
import { TranslocoModule } from "@ngneat/transloco";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { AuthRecoverAccountComponent} from "./auth-recover-account.component";

@NgModule({
	declarations: [AuthLogInComponent, AuthResetPasswordModalComponent, AuthRecoverAccountComponent],
	imports: [
		CommonModule,
		AuthLogInRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		B2bNgxInputModule,
		B2bNgxButtonModule,
		B2bNgxDividerModule,
		B2bNgxLinkModule,
		B2bNgxImageModule,
		TranslocoModule,
	],
})
export class AuthLogInModule {}
