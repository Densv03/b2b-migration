import { NgModule } from "@angular/core";
import { ClientTradebidQuotationFormComponent } from "./layout/client-tradebid-quotation-form.component";
import { CommonModule } from "@angular/common";
import { ClientTradebidRoutingModule } from "../../client-tradebid-routing.module";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { TranslocoModule } from "@ngneat/transloco";
import { RouterModule } from "@angular/router";
// import { B2bNgxTreeviewModule } from "@b2b/ngx-treeview";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
import { B2bNgxCheckboxModule } from "@b2b/ngx-checkbox";
// import { B2bNgxPaginationModule } from "@b2b/ngx-pagination";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import {B2bNgxFileModule} from "@b2b/ngx-file";
import {B2bNgxTextareaModule} from "@b2b/ngx-textarea";

@NgModule({
	declarations: [ClientTradebidQuotationFormComponent],
	// exports: [ClientTradebidQuotationFormComponent],
  imports: [
    CommonModule,
    ClientTradebidRoutingModule,
    B2bNgxButtonModule,
    B2bNgxImageModule,
    TranslocoModule,
    RouterModule,
    // B2bNgxTreeviewModule,
    B2bNgxInputModule,
    ReactiveFormsModule,
    B2bNgxSelectModule,
    // B2bNgxTextareaModule,
    // B2bNgxFileModule,
    B2bNgxCountrySelectModule,
    B2bNgxCheckboxModule,
    // B2bNgxPaginationModule,
    B2bNgxIconModule,
    B2bNgxFileModule,
    B2bNgxTextareaModule,
    // B2bNgxTelModule,
  ],
})
export class ClientTradebidQuotationFormModule {}
