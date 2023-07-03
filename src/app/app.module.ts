import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {B2bNgxCheckboxModule} from "@b2b/ngx-checkbox";
import {B2bNgxCountrySelectModule} from "@b2b/ngx-country-select";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    B2bNgxCheckboxModule,
    B2bNgxCountrySelectModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
