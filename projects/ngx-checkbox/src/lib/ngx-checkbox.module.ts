import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxCheckboxComponent } from "./layout/ngx-checkbox.component";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxIconModule } from "@b2b/ngx-icon";

@NgModule({
	declarations: [B2bNgxCheckboxComponent],
	imports: [CommonModule, ReactiveFormsModule, B2bNgxIconModule],
	exports: [B2bNgxCheckboxComponent],
})
export class B2bNgxCheckboxModule {}
