import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeLatestProductsSliderComponent} from "./home-latest-products-slider.component";
// import {SwiperModule} from "swiper/angular";
import {B2bNgxIconModule} from "@b2b/ngx-icon";
import {B2bNgxImageModule} from "@b2b/ngx-image";
import {RouterModule} from "@angular/router";



@NgModule({
	declarations: [HomeLatestProductsSliderComponent],
	exports: [
		HomeLatestProductsSliderComponent
	],
	imports: [
		CommonModule,
		// SwiperModule,
		B2bNgxIconModule,
		B2bNgxImageModule,
		RouterModule
	],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeLatestProductsSliderModule { }
