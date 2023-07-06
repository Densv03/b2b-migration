import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRegisterBuyerCompanyInfoComponent} from "./auth-register-buyer-company-info.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslocoModule} from "@ngneat/transloco";
import {B2bNgxButtonModule} from "../../../../../../../../../libs/ngx-button/src";
import {NgxCategoryDropdownsModule} from "../../../../../../../../../libs/ngx-category-dropdowns/src";
import {B2bNgxSelectModule} from "../../../../../../../../../libs/ngx-select/src";
import {B2bNgxCountrySelectModule} from "../../../../../../../../../libs/ngx-country-select/src";



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
		NgxCategoryDropdownsModule,
		B2bNgxSelectModule,
		B2bNgxCountrySelectModule
	]
})
export class AuthRegisterBuyerCompanyInfoModule { }
