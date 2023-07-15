import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductPostingCompleteComponent} from "./product-posting-complete.component";
import {RouterModule, Routes} from "@angular/router";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {B2bNgxIconModule} from "@b2b/ngx-icon";
import {B2bNgxImageModule} from "@b2b/ngx-image";

const routes: Routes = [{path: '', component: ProductPostingCompleteComponent}]

@NgModule({
  declarations: [ProductPostingCompleteComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		B2bNgxButtonModule,
		B2bNgxIconModule,
		B2bNgxImageModule
	]
})
export class ProductPostingCompleteModule { }
