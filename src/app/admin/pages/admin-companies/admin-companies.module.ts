import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCompaniesRoutingModule } from './admin-companies-routing.module';
import { AdminCompaniesComponent } from './layout/admin-companies.component';
import {B2bNgxInputModule} from "@b2b/ngx-input";
import {ReactiveFormsModule} from "@angular/forms";
import {B2bNgxPaginationModule} from "@b2b/ngx-pagination";
import {B2bNgxIconModule} from "@b2b/ngx-icon";
import {MatTableModule} from "@angular/material/table";
import {B2bNgxCountrySelectModule} from "@b2b/ngx-country-select";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";


@NgModule({
  declarations: [
    AdminCompaniesComponent
  ],
    imports: [
        CommonModule,
        AdminCompaniesRoutingModule,
        B2bNgxInputModule,
        ReactiveFormsModule,
        B2bNgxPaginationModule,
        B2bNgxIconModule,
        MatTableModule,
        B2bNgxCountrySelectModule,
        NgxDaterangepickerMd.forRoot()
    ]
})
export class AdminCompaniesModule { }
