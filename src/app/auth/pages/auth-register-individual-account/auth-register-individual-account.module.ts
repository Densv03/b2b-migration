import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxBackModule } from "@b2b/ngx-back";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxCheckboxModule } from "@b2b/ngx-checkbox";
// import { B2bNgxDividerModule } from "@b2b/ngx-divider";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
// import { B2bNgxTelModule } from "@b2b/ngx-tel";
// import { B2bNgxTreeviewModule } from "@b2b/ngx-treeview";
// import { ErrorTailorModule } from "@ngneat/error-tailor";
import { TranslocoModule } from "@ngneat/transloco";
import { AuthRegisterIndividualAccountComponent} from "./layout/auth-register-individual-account.component";
import { AuthRegisterIndividualAccountRoutingModule } from "./auth-register-individual-account-routing.module";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
import { AuthRegisterIndividualAccountFirstStepComponent } from "../auth-register-individual-account-first-step/auth-register-individual-account-first-step.component";
import { AuthRegisterIndividualAccountSecondStepComponent } from "../auth-register-individual-account-second-step/auth-register-individual-account-second-step.component";
// import {
//     CategoriesDialogModule
// } from "../../../../../../../libs/shared/components/categories-dialog/categories-dialog.module";

@NgModule({
	declarations: [
		AuthRegisterIndividualAccountComponent,
		AuthRegisterIndividualAccountFirstStepComponent,
		AuthRegisterIndividualAccountSecondStepComponent,
	],
    imports: [
        CommonModule,
        AuthRegisterIndividualAccountRoutingModule,
        ReactiveFormsModule,
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
        B2bNgxImageModule,
        B2bNgxSelectModule,
        MatDialogModule,
        B2bNgxCountrySelectModule,
        // CategoriesDialogModule,
    ],
})
export class AuthRegisterIndividualAccountModule {}
