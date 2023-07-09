import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { B2bNgxBackModule } from "@b2b/ngx-back";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxCheckboxModule } from "@b2b/ngx-checkbox";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
// import { ErrorTailorModule } from "@ngneat/error-tailor";
import { TranslocoModule } from "@ngneat/transloco";
import { AuthRegisterGoogleAccountRoutingModule } from "./auth-register-google-account-routing.module";
import { AuthRegisterGoogleAccountComponent } from "./layout/auth-register-google-account.component";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
	declarations: [AuthRegisterGoogleAccountComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRegisterGoogleAccountRoutingModule,
        // ErrorTailorModule,
        B2bNgxInputModule,
        B2bNgxButtonModule,
        // B2bNgxDividerModule,
        B2bNgxCheckboxModule,
        B2bNgxLinkModule,
        B2bNgxBackModule,
        // B2bNgxTelModule,
        // B2bNgxTreeviewModule,
        TranslocoModule,
        B2bNgxIconModule,
        B2bNgxSelectModule,
        MatDialogModule,
        // CategoriesDialogModule,
    ],
})
export class AuthRegisterGoogleAccountModule {}
