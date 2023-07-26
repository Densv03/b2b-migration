import {CommonModule, NgForOf} from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { B2bBreadcrumpsComponent } from './b2b-breadcrumps.component';



@NgModule({
  declarations: [
    B2bBreadcrumpsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    B2bBreadcrumpsComponent
  ]
})
export class B2bBreadcrumpsModule { }
