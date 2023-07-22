import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminUsersRoutingModule } from "./admin-users-routing.module";
import { AdminUsersComponent } from "./layout/admin-users.component";
import { AdminUsersListComponent } from "./components/admin-users-list/admin-users-list.component";
import { B2bNgxDropdownModule } from "@b2b/ngx-dropdown";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxPaginationModule } from "@b2b/ngx-pagination";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { AdminUsersFiltersComponent } from "./components/admin-users-filters/admin-users-filters.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { B2bNgxTelModule } from "@b2b/ngx-tel";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
import { B2bNgxToggleModule } from "@b2b/ngx-toggle";
import { ChangeQuotesAmountDialogComponent } from "./components/change-quotes-amount-dialog/change-quotes-amount-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import {TreeviewModule } from "@b2b/ngx-treeview";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";

@NgModule({
	declarations: [
		AdminUsersComponent,
		AdminUsersListComponent,
		AdminUsersFiltersComponent,
		ChangeQuotesAmountDialogComponent,
	],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    AdminUsersRoutingModule,
    B2bNgxDropdownModule,
    B2bNgxImageModule,
    B2bNgxButtonModule,
    B2bNgxIconModule,
    B2bNgxPaginationModule,
    NgxDatatableModule,
    B2bNgxSelectModule,
    B2bNgxTelModule,
    B2bNgxInputModule,
    B2bNgxCountrySelectModule,
    B2bNgxToggleModule,
    TreeviewModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
  ],
})
export class AdminUsersModule {}
