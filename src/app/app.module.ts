import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {B2bNgxCheckboxModule} from "@b2b/ngx-checkbox";
import {B2bNgxTextareaModule} from "@b2b/ngx-textarea";
import {NgxPasswordModule} from "@b2b/ngx-password";
import {CoreModule} from "./core/core.module";
import {HttpClientModule} from "@angular/common/http";
import { TranslocoRootModule } from './transloco-root.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatIconModule,
    B2bNgxCheckboxModule,
    FormsModule,
    B2bNgxTextareaModule,
    NgxPasswordModule,
    HttpClientModule,
    TranslocoRootModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
