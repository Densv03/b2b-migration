import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRegisterComponent} from "../../auth-register.component";
import {AuthRegisterAccountTypeComponent} from "./auth-register-account-type.component";
import {ReactiveFormsModule} from "@angular/forms";
import {B2bNgxTelModule} from "../../../../../../../../../libs/ngx-tel/src/lib/ngx-tel.module";
import {B2bNgxCountrySelectModule} from "../../../../../../../../../libs/ngx-country-select/src";
import {B2bNgxSelectModule} from "../../../../../../../../../libs/ngx-select/src";
import {B2bNgxCheckboxModule} from "../../../../../../../../../libs/ngx-checkbox/src";
import {B2bNgxButtonModule} from "../../../../../../../../../libs/ngx-button/src";
import {TranslocoModule} from "@ngneat/transloco";
import {B2bNgxInputModule} from "../../../../../../../../../libs/ngx-input/src";



@NgModule({
    declarations: [AuthRegisterAccountTypeComponent],
    exports: [
        AuthRegisterAccountTypeComponent
    ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		B2bNgxTelModule,
		B2bNgxCountrySelectModule,
		B2bNgxSelectModule,
		B2bNgxCheckboxModule,
		B2bNgxButtonModule,
		TranslocoModule,
		B2bNgxInputModule
	]
})
export class AuthRegisterAccountTypeModule { }
