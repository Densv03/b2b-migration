import {AppComponent} from "../app.component";
import {CommonModule} from "@angular/common";
import {CoreComponent} from "./layout/core.component";
import {NgModule} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {CoreRoutingModule} from "./core-routing.module";
import {TabsModule} from "ngx-bootstrap/tabs";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {ClientHeaderComponent} from "../client/components/client-header/client-header.component";
import {B2bNgxLinkModule} from "@b2b/ngx-link";
import {B2bNgxIconModule} from "@b2b/ngx-icon";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {B2bNgxImageModule} from "@b2b/ngx-image";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslocoModule} from "@ngneat/transloco";
import {AuthInterceptor} from "../auth/interceptors/auth/auth.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";


@NgModule({
	declarations: [AppComponent, CoreComponent, ClientHeaderComponent],
    imports: [
        CommonModule,
        CoreRoutingModule,
        RouterOutlet,
        TabsModule.forRoot(),
        CarouselModule.forRoot(),
        B2bNgxLinkModule,
        B2bNgxIconModule,
        B2bNgxButtonModule,
        B2bNgxImageModule,
        BrowserAnimationsModule,
        TranslocoModule
    ],
	exports: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule {
  constructor() {
    console.log('WORKS')

  }

}
