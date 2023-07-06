import {AppComponent} from "../app.component";
import {CommonModule} from "@angular/common";
import {CoreComponent} from "./layout/core.component";
import {NgModule} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {CoreRoutingModule} from "./core-routing.module";
import {HotToastModule} from "@ngneat/hot-toast";
import {TabsModule} from "ngx-bootstrap/tabs";
import {CarouselModule} from "ngx-bootstrap/carousel";


@NgModule({
	declarations: [AppComponent, CoreComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    RouterOutlet,
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    HotToastModule.forRoot()
  ],
	exports: [AppComponent],
})
export class CoreModule {
  constructor() {
    console.log('WORKS')

  }

}
