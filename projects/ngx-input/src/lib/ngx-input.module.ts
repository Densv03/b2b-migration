import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxInputComponent } from "./layout/ngx-input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { B2bNgxInputDirective } from "./directive/ngx-input.directive";

@NgModule({
	declarations: [B2bNgxInputComponent, B2bNgxInputDirective],
	imports: [CommonModule, ReactiveFormsModule, FormsModule, ReactiveFormsModule],
	exports: [B2bNgxInputComponent, B2bNgxInputDirective],
})
export class B2bNgxInputModule {}
