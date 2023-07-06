import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WriteToSupportComponent} from "./write-to-support.component";



@NgModule({
  declarations: [WriteToSupportComponent],
	exports: [WriteToSupportComponent],
  imports: [
    CommonModule
  ]
})
export class WriteToSupportModule { }
