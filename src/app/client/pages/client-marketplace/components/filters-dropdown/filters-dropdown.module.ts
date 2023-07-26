import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FiltersDropdownComponent} from "./filters-dropdown.component";
@NgModule({
  declarations: [FiltersDropdownComponent],
  exports: [
    FiltersDropdownComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FiltersDropdownModule { }
