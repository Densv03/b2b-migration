import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRegisterComponent} from "./auth-register.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthRegisterAccountTypeModule} from "./components/auth-register-account-type/auth-register-account-type.module";
import {AuthRegisterBuyerCompanyInfoModule} from "./components/auth-register-buyer-company-info/auth-register-buyer-company-info.module";
import {
	AuthRegisterSupplierCompanyInfoModule
} from "./components/auth-register-supplier-company-info/auth-register-supplier-company-info.module";
import {
	AuthRegisterBasicInfoModule
} from "./components/auth-register-basic-info/auth-register-basic-info.module";
import {MatStepperModule} from "@angular/material/stepper";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {B2bNgxIconModule} from "@b2b/ngx-icon";
import {
	AuthRegisterIndividualAccountModule
} from "../auth-register-individual-account/auth-register-individual-account.module";

const routes: Routes = [{path: '', component: AuthRegisterComponent}];

@NgModule({
  declarations: [AuthRegisterComponent],
	imports: [
		CommonModule,
		AuthRegisterSupplierCompanyInfoModule,
		AuthRegisterBasicInfoModule,
		AuthRegisterAccountTypeModule,
		AuthRegisterBuyerCompanyInfoModule,
		RouterModule.forChild(routes),
		MatStepperModule,
		B2bNgxButtonModule,
		B2bNgxIconModule,
		// AuthRegisterIndividualAccountModule
	]
})
export class AuthRegisterModule { }
