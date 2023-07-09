import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxTelComponent } from "./layout/ngx-tel.component";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
// import { NgxMaskModule } from "ngx-mask";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		B2bNgxInputModule,
		B2bNgxIconModule,
		NgSelectModule,
		NgxIntlTelInputModule,
		// NgxMaskModule.forRoot(),
	],
	declarations: [B2bNgxTelComponent],
	exports: [B2bNgxTelComponent],
})
export class B2bNgxTelModule {}
