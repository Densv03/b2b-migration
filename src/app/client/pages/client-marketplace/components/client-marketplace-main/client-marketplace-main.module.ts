import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {ClientMarketplaceMainComponent} from "./client-marketplace-main.component";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {CategoryItemModule} from "../../pages/category-listing/category-item/category-item.module";
// import {SwiperModule} from "swiper/angular";
import { CompaniesCounterComponent } from './components/companies-counter/companies-counter.component';
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {MatTabsModule} from "@angular/material/tabs";
import {B2bNgxSelectModule} from "@b2b/ngx-select";
import {B2bNgxInputModule} from "@b2b/ngx-input";
import {ReactiveFormsModule} from "@angular/forms";
import { B2bBreadcrumpsModule } from "@b2b/breadcrumps";

const routes: Routes = [{path: '', component: ClientMarketplaceMainComponent}]
@NgModule({
	declarations: [ClientMarketplaceMainComponent, CompaniesCounterComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		CategoryItemModule,
		// SwiperModule,
		B2bNgxButtonModule,
		MatTabsModule,
		B2bNgxSelectModule,
		B2bNgxInputModule,
		ReactiveFormsModule,
		B2bBreadcrumpsModule
	],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ClientMarketplaceMainModule {}
