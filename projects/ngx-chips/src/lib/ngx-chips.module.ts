import { NgModule } from '@angular/core';
import { B2bNgxChipsComponent } from './layout/ngx-chips.component';
import {B2bNgxSelectModule} from "@b2b/ngx-select";
import {ReactiveFormsModule} from "@angular/forms";
import {B2bNgxIconModule} from "@b2b/ngx-icon";

@NgModule({
  declarations: [
    B2bNgxChipsComponent
  ],
  imports: [
    B2bNgxSelectModule,
    ReactiveFormsModule,
    B2bNgxIconModule
  ],
  exports: [
    B2bNgxChipsComponent
  ]
})
export class B2bNgxChipsModule { }
