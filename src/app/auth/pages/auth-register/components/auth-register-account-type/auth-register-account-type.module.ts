import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRegisterComponent} from "../../auth-register.component";
import {AuthRegisterAccountTypeComponent} from "./auth-register-account-type.component";
import {ReactiveFormsModule} from "@angular/forms";
// import {B2bNgxTelModule} from "../../../../../../../../../libs/ngx-tel/src/lib/ngx-tel.module";
import {B2bNgxCountrySelectModule} from "@b2b/ngx-country-select";
import {B2bNgxSelectModule} from "@b2b/ngx-select";
import {B2bNgxCheckboxModule} from "@b2b/ngx-checkbox";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {TranslocoModule} from "@ngneat/transloco";
import {B2bNgxInputModule} from "@b2b/ngx-input";


@NgModule({
    declarations: [AuthRegisterAccountTypeComponent],
    exports: [
        AuthRegisterAccountTypeComponent
    ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		// B2bNgxTelModule,
		B2bNgxCountrySelectModule,
		B2bNgxSelectModule,
		B2bNgxCheckboxModule,
		B2bNgxButtonModule,
		TranslocoModule,
		B2bNgxInputModule
	]
})
export class AuthRegisterAccountTypeModule { }
