import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRegisterBasicInfoComponent} from "./auth-register-basic-info.component";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {B2bNgxCountrySelectModule} from "@b2b/ngx-country-select";
import {B2bNgxInputModule} from "@b2b/ngx-input";
// import {B2bNgxTelModule} from "../../../../../../../../../lib/ngx-tel/src/lib/ngx-tel.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslocoModule} from "@ngneat/transloco";
import {B2bNgxTelModule} from "@b2b/ngx-tel";



@NgModule({
	declarations: [AuthRegisterBasicInfoComponent],
	exports: [
		AuthRegisterBasicInfoComponent
	],
  imports: [
    CommonModule,
    B2bNgxButtonModule,
    B2bNgxCountrySelectModule,
    B2bNgxInputModule,
    // B2bNgxTelModule,
    ReactiveFormsModule,
    TranslocoModule,
    B2bNgxTelModule
  ]
})
export class AuthRegisterBasicInfoModule { }
