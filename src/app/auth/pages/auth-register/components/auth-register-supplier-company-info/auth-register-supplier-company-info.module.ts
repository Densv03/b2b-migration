import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRegisterSupplierCompanyInfoComponent} from "./auth-register-supplier-company-info.component";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {B2bNgxSelectModule} from "@b2b/ngx-select";
import {NgxCategoryDropdownsModule} from "../../../../../../../projects/ngx-category-dropdowns/src/lib/ngx-category-dropdowns.module";
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
