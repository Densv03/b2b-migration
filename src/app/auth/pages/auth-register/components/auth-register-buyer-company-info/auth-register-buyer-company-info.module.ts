import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRegisterBuyerCompanyInfoComponent} from "./auth-register-buyer-company-info.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslocoModule} from "@ngneat/transloco";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
// import {NgxCategoryDropdownsModule} from "../../../../../../../../../lib/ngx-category-dropdowns/src";
import {B2bNgxSelectModule} from "@b2b/ngx-select";
import {B2bNgxCountrySelectModule} from "@b2b/ngx-country-select";
// import {
//   NgxCategoryDropdownsModule
// } from "../../../../../../../projects/ngx-category-dropdowns/src/lib/ngx-category-dropdowns.module";


@NgModule({
    declarations: [AuthRegisterBuyerCompanyInfoComponent],
    exports: [
        AuthRegisterBuyerCompanyInfoComponent
    ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TranslocoModule,
		B2bNgxButtonModule,
		// NgxCategoryDropdownsModule,
		B2bNgxSelectModule,
		B2bNgxCountrySelectModule
	]
})
export class AuthRegisterBuyerCompanyInfoModule { }
