import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeLatestProductsComponent} from "./home-latest-products.component";
// import {SwiperModule} from "swiper/angular";
import {HomeLatestProductsSliderModule} from "../home-latest-products-slider/home-latest-products-slider.module";
import {RouterModule} from "@angular/router";
import {TabsModule} from "ngx-bootstrap/tabs";
import {CarouselModule} from "ngx-bootstrap/carousel";



@NgModule({
	declarations: [HomeLatestProductsComponent],
	exports: [
		HomeLatestProductsComponent
	],
    imports: [
        CommonModule,

        // SwiperModule,
        HomeLatestProductsSliderModule,
        RouterModule
    ]
})
export class HomeLatestProductsModule { }
