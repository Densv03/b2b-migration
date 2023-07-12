import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxRadioComponent } from "./layout/ngx-radio.component";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxIconModule } from "@b2b/ngx-icon";

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, B2bNgxIconModule],
	declarations: [B2bNgxRadioComponent],
	exports: [B2bNgxRadioComponent],
})
export class B2bNgxRadioModule {}
