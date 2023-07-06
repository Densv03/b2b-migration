import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRegisterBasicInfoComponent} from "./auth-register-basic-info.component";
import {B2bNgxButtonModule} from "../../../../../../../../../libs/ngx-button/src";
import {B2bNgxCountrySelectModule} from "../../../../../../../../../libs/ngx-country-select/src";
import {B2bNgxInputModule} from "../../../../../../../../../libs/ngx-input/src";
import {B2bNgxTelModule} from "../../../../../../../../../libs/ngx-tel/src/lib/ngx-tel.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslocoModule} from "@ngneat/transloco";



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
		B2bNgxTelModule,
		ReactiveFormsModule,
		TranslocoModule
	]
})
export class AuthRegisterBasicInfoModule { }
