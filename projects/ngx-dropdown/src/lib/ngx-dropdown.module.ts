import { NgModule } from '@angular/core';
import { B2bNgxDropdownComponent } from './layout/ngx-dropdown.component';
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {B2bNgxImageModule} from "@b2b/ngx-image";
import {B2bNgxIconModule} from "@b2b/ngx-icon";



@NgModule({
  declarations: [
    B2bNgxDropdownComponent
  ],
  imports: [
    CommonModule,
    B2bNgxButtonModule,
    B2bNgxIconModule
  ],
  exports: [
    B2bNgxDropdownComponent
  ]
})
export class B2bNgxDropdownModule { }
