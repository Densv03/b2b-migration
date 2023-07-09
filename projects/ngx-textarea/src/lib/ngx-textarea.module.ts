import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxTextareaComponent } from "./layout/ngx-textarea.component";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxTextareaDirective } from "./directive/ngx-textarea.directive";

@NgModule({
	imports: [CommonModule, ReactiveFormsModule],
	declarations: [B2bNgxTextareaComponent, B2bNgxTextareaDirective],
	exports: [B2bNgxTextareaComponent, B2bNgxTextareaDirective],
})
export class B2bNgxTextareaModule {}
