import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ClientMarketPromotionComponent} from "./client-market-promotion.component";
import {B2bNgxImageModule} from "@b2b/ngx-image";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {B2bNgxIconModule} from "@b2b/ngx-icon";
import {B2bNgxTextareaModule} from "@b2b/ngx-textarea";
import {B2bNgxTelModule} from "@b2b/ngx-tel";
import {B2bNgxInputModule} from "@b2b/ngx-input";
import {ReactiveFormsModule} from "@angular/forms";
import { WriteToSupportModule } from '../../shared/components/write-to-support/write-to-support.module';

const routes: Routes = [{path: '', component: ClientMarketPromotionComponent}]

@NgModule({
  declarations: [ClientMarketPromotionComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		B2bNgxImageModule,
		B2bNgxButtonModule,
		B2bNgxIconModule,
		B2bNgxTextareaModule,
		B2bNgxTelModule,
		B2bNgxInputModule,
		ReactiveFormsModule,
		WriteToSupportModule
	]
})
export class ClientMarketPromotionModule { }
