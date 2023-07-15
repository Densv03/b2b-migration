import { NgModule } from "@angular/core";
import { CategoriesDialogComponent } from "./layout/categories-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { CategoriesModalListComponent } from "./categories-modal-list/categories-modal-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CategoriesPopupComponent } from './categories-popup-component/categories-popup.component';
import {B2bNgxSelectModule} from "@b2b/ngx-select";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {B2bNgxCheckboxModule} from "@b2b/ngx-checkbox";
import {B2bNgxToggleModule} from "@b2b/ngx-toggle";

@NgModule({
	declarations: [CategoriesDialogComponent, CategoriesModalListComponent, CategoriesPopupComponent],
	exports: [CategoriesDialogComponent, CategoriesModalListComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatDialogModule,
    B2bNgxCheckboxModule,
    B2bNgxToggleModule,
    B2bNgxButtonModule,
    ReactiveFormsModule,
    B2bNgxSelectModule,
    B2bNgxSelectModule,
  ],
})
export class CategoriesDialogModule {}
