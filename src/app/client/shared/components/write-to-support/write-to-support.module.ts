import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WriteToSupportComponent} from "./write-to-support.component";
import { TranslocoModule } from '@ngneat/transloco';



@NgModule({
  declarations: [WriteToSupportComponent],
	exports: [WriteToSupportComponent],
  imports: [
    CommonModule,
    TranslocoModule
  ]
})
export class WriteToSupportModule { }
