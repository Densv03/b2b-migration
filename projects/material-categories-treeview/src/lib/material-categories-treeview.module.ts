import { NgModule } from '@angular/core';
import { MaterialCategoriesTreeviewComponent } from './material-categories-treeview.component';
import {B2bNgxCheckboxModule} from "@b2b/ngx-checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    MaterialCategoriesTreeviewComponent
  ],
  imports: [
    B2bNgxCheckboxModule,
    MatIconModule,
    MatTreeModule,
    MatButtonModule
  ],
  exports: [
    MaterialCategoriesTreeviewComponent
  ]
})
export class MaterialCategoriesTreeviewModule { }
