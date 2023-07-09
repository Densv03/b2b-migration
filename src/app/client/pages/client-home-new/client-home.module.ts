import {NgModule} from "@angular/core";
import {ClientHomeComponent} from "./layout/client-home.component";
import {CommonModule} from "@angular/common";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {ClientHomeRoutingModule} from "./client-home-routing.module";
import {B2bNgxLinkModule} from "@b2b/ngx-link";
// import { ClientHomeOldModule } from "../client-home/client-home-old.module";
import {B2bNgxImageModule} from "@b2b/ngx-image";
import {B2bNgxIconModule} from "@b2b/ngx-icon";
// import { SwiperModule } from "swiper/angular";
// import "swiper/css";
// import "swiper/css/pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeLatestProductsModule} from "./components/home-latest-products/home-latest-products.module";
import {B2bNgxCheckboxModule} from "@b2b/ngx-checkbox";
// import {ErrorTailorModule} from "@ngneat/error-tailor";
import {B2bNgxInputModule} from "@b2b/ngx-input";
import {RouterModule} from "@angular/router";
import {B2bNgxTelModule} from "../../../../../projects/ngx-tel/src/lib/ngx-tel.module";

@NgModule({
  declarations: [ClientHomeComponent],
  exports: [],
  imports: [
    RouterModule,
    CommonModule,
    B2bNgxButtonModule,
    ClientHomeRoutingModule,
    B2bNgxLinkModule,
    // ClientHomeOldModule,
    B2bNgxImageModule,
    B2bNgxIconModule,
    // SwiperModule,
    ReactiveFormsModule,
    B2bNgxImageModule,
    HomeLatestProductsModule,
    B2bNgxCheckboxModule,
    // ErrorTailorModule,
    B2bNgxInputModule,
    FormsModule,
    B2bNgxTelModule
  ],
})
export class ClientHomeModule {
}
