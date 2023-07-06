import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRegisterSupplierCompanyInfoComponent} from "./auth-register-supplier-company-info.component";
import {B2bNgxButtonModule} from "../../../../../../../../../libs/ngx-button/src";
import {B2bNgxSelectModule} from "../../../../../../../../../libs/ngx-select/src";
import {NgxCategoryDropdownsModule} from "../../../../../../../../../libs/ngx-category-dropdowns/src";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslocoModule} from "@ngneat/transloco";


@NgModule({
	declarations: [AuthRegisterSupplierCompanyInfoComponent],
	exports: [AuthRegisterSupplierCompanyInfoComponent],
	imports: [
		CommonModule,
		B2bNgxButtonModule,
		B2bNgxSelectModule,
		NgxCategoryDropdownsModule,
		ReactiveFormsModule,
		TranslocoModule
	]
})
export class AuthRegisterSupplierCompanyInfoModule {
}
