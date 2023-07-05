import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxCategoryDropdownsComponent } from './layout/ngx-category-dropdowns.component';
import {B2bNgxTreeviewModule} from "@b2b/ngx-treeview";
import {ReactiveFormsModule} from "@angular/forms";
import { NgxSubcategorySelectablePartComponent } from './components/ngx-subcategory-selectable-part/ngx-subcategory-selectable-part.component';
import {B2bNgxToggleModule} from "@b2b/ngx-toggle";
import {B2bNgxCheckboxModule} from "@b2b/ngx-checkbox";
import {B2bNgxIconModule} from "@b2b/ngx-icon";

@NgModule({
	imports: [CommonModule, B2bNgxTreeviewModule, ReactiveFormsModule, B2bNgxToggleModule, B2bNgxCheckboxModule, B2bNgxIconModule],
	declarations: [
   NgxCategoryDropdownsComponent,
   NgxSubcategorySelectablePartComponent,
	],
    exports: [NgxCategoryDropdownsComponent, NgxSubcategorySelectablePartComponent]
})
export class NgxCategoryDropdownsModule {}
