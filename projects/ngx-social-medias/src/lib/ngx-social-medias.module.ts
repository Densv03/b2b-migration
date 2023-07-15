import { NgModule } from '@angular/core';
import {B2bNgxSocialMediasComponent} from "./layout/ngx-social-medias.component";
import {B2bNgxTelModule} from "@b2b/ngx-tel";
import {ReactiveFormsModule} from "@angular/forms";
import {B2bNgxIconModule} from "@b2b/ngx-icon";

@NgModule({
  declarations: [
    B2bNgxSocialMediasComponent
  ],
  imports: [
    B2bNgxTelModule,
    ReactiveFormsModule,
    B2bNgxIconModule
  ],
  exports: [
    B2bNgxSocialMediasComponent
  ]
})
export class B2bNgxSocialMediasModule { }
