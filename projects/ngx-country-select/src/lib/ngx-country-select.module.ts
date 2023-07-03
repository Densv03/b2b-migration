import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxCountrySelectComponent } from "../lib/layout/ngx-country-select.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxImageModule } from "@b2b/ngx-image";

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, B2bNgxIconModule, B2bNgxImageModule, NgSelectModule],
	declarations: [B2bNgxCountrySelectComponent],
	exports: [B2bNgxCountrySelectComponent],
})
export class B2bNgxCountrySelectModule {}
