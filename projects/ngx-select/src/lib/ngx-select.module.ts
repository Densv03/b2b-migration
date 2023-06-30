import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxSelectComponent } from "./layout/ngx-select.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	imports: [CommonModule, NgSelectModule, ReactiveFormsModule],
	declarations: [B2bNgxSelectComponent],
	exports: [B2bNgxSelectComponent],
})
export class B2bNgxSelectModule {}
