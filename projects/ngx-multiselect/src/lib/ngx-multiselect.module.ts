import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxMultiselectComponent } from "./layout/ngx-multiselect.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	imports: [CommonModule, NgSelectModule, ReactiveFormsModule],
	declarations: [B2bNgxMultiselectComponent],
	exports: [B2bNgxMultiselectComponent],
})
export class B2bNgxMultiselectModule {}
