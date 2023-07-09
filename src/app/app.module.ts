import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {B2bNgxCheckboxModule} from "@b2b/ngx-checkbox";
import {MaterialExampleComponent} from "./material-example/material-example.component";
import {B2bNgxTextareaModule} from "@b2b/ngx-textarea";
import {NgxPasswordModule} from "@b2b/ngx-password";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatIconModule,
    B2bNgxCheckboxModule,
    MaterialExampleComponent,
    FormsModule,
    B2bNgxTextareaModule,
    NgxPasswordModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
