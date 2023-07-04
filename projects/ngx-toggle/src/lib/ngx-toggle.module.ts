import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxToggleComponent } from "./layout/ngx-toggle.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	imports: [CommonModule, ReactiveFormsModule],
	declarations: [B2bNgxToggleComponent],
	exports: [B2bNgxToggleComponent],
})
export class B2bNgxToggleModule {}
