import {NgModule} from "@angular/core";
import {ClientMarketCompanyPageComponent} from "./client-market-company-page.component";
import {RouterModule, Routes} from "@angular/router";
import {CompanyContactCardComponent} from "./components/company-contact-card/company-contact-card.component";
import {B2bNgxIconModule} from "@b2b/ngx-icon";
import {B2bNgxImageModule} from "@b2b/ngx-image";
import {MatTabsModule} from "@angular/material/tabs";
import {
	MarketCompanyInformationModule
} from "./components/market-company-information/market-company-information.module";
import {MarketCompanyProductsModule} from "./components/company-products/market-company-products.module";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {CommonModule} from "@angular/common";
import {B2bNgxSkeletonModule} from "@b2b/ngx-skeleton";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {
	ClientMarketCompanyPagePhoneDialogComponent
} from './components/client-market-company-page-phone-dialog/client-market-company-page-phone-dialog.component';

const routes: Routes = [{path: "", component: ClientMarketCompanyPageComponent}]

@NgModule({
	declarations: [
		ClientMarketCompanyPageComponent,
		CompanyContactCardComponent,
		ClientMarketCompanyPagePhoneDialogComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		B2bNgxIconModule,
		B2bNgxImageModule,
		MatTabsModule,
		MarketCompanyInformationModule,
		MarketCompanyProductsModule,
		B2bNgxButtonModule,
		B2bNgxSkeletonModule,
		MatButtonModule,
		MatDialogModule
	]
})

export class ClientMarketCompanyPageModule {
}
