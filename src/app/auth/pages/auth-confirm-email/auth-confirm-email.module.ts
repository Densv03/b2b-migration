import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthConfirmEmailRoutingModule } from "./auth-confirm-email-routing.module";
import { AuthConfirmEmailComponent } from "apps/site/src/app/auth/pages/auth-confirm-email/layout/auth-confirm-email.component";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [AuthConfirmEmailComponent],
	imports: [CommonModule, AuthConfirmEmailRoutingModule, ReactiveFormsModule, B2bNgxButtonModule, TranslocoModule],
})
export class AuthConfirmEmailModule {}
