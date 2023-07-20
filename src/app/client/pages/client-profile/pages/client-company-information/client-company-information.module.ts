import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientCompanyInformationComponent } from "./layout/client-company-information.component";
import { ClientCompanyInformationRoutingModule } from "./client-company-information-routing.module";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
// import { B2bNgxTelModule } from "@b2b/ngx-tel";
// import { B2bNgxTextareaModule } from "@b2b/ngx-textarea";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
// import { B2bNgxFileModule } from "@b2b/ngx-file";
// import { B2bNgxLogoModule } from "../../../../../../../../../lib/ngx-logo/src";
// import { B2bNgxRadioModule } from "../../../../../../../../../lib/ngx-radio/src/lib/ngx-radio.module";

@NgModule({
	declarations: [ClientCompanyInformationComponent],
  imports: [
    CommonModule,
    ClientCompanyInformationRoutingModule,
    B2bNgxInputModule,
    B2bNgxSelectModule,
    B2bNgxCountrySelectModule,
    // B2bNgxTelModule,
    // B2bNgxTextareaModule,
    ReactiveFormsModule,
    B2bNgxIconModule,
    B2bNgxButtonModule,
    FormsModule
    // B2bNgxFileModule,
    // B2bNgxLogoModule,
    // B2bNgxRadioModule,
  ],
})
export class ClientCompanyInformationModule {}
