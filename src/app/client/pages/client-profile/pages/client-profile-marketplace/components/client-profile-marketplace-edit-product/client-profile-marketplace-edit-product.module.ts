import { NgModule } from "@angular/core";
import { ClientProfileMarketplaceEditProductComponent } from "./client-profile-marketplace-edit-product.component";
// import { ErrorTailorModule } from "@ngneat/error-tailor";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxTextareaModule } from "@b2b/ngx-textarea";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { B2bNgxFileModule } from "@b2b/ngx-file";
import { B2bNgxMultiselectModule } from "@b2b/ngx-multiselect";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { CommonModule } from "@angular/common";
import {
    CategoriesDialogModule
} from "../../../../../../../../../../../libs/shared/components/categories-dialog/categories-dialog.module";

@NgModule({
    imports: [
        CommonModule,
        // ErrorTailorModule,
        ReactiveFormsModule,
        B2bNgxInputModule,
        B2bNgxTextareaModule,
        B2bNgxSelectModule,
        B2bNgxFileModule,
        B2bNgxMultiselectModule,
        B2bNgxCountrySelectModule,
        B2bNgxButtonModule,
        B2bNgxIconModule,
        CategoriesDialogModule,
    ],
	declarations: [ClientProfileMarketplaceEditProductComponent],
})
export class ClientProfileMarketplaceEditProductModule {}
