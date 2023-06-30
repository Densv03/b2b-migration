import {NgModule} from '@angular/core';
import {B2bNgxButtonComponent} from "./layout/ngx-button.component";
import {B2bNgxButtonDirective} from "./directive/ngx-button.directive";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    B2bNgxButtonComponent, B2bNgxButtonDirective
  ],
  imports: [CommonModule],
  exports: [
    B2bNgxButtonComponent,
    B2bNgxButtonDirective
  ]
})
export class NgxButtonModule {
}
