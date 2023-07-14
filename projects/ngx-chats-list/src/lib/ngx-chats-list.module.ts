import { NgModule } from '@angular/core';
import { B2bNgxChatsListComponent } from './layout/ngx-chats-list.component';
import {RouterLinkWithHref} from "@angular/router";
import {DatePipe} from "@angular/common";
import {B2bNgxDropdownModule} from "@b2b/ngx-dropdown";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {B2bNgxIconModule} from "@b2b/ngx-icon";



@NgModule({
  declarations: [
    B2bNgxChatsListComponent
  ],
  imports: [
    RouterLinkWithHref,
    DatePipe,
    B2bNgxDropdownModule,
    B2bNgxButtonModule,
    B2bNgxIconModule
  ],
  exports: [
    B2bNgxChatsListComponent
  ]
})
export class B2bNgxChatsListModule { }
