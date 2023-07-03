import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxImageDirective } from "./directive/ngx-image.directive";

@NgModule({
	imports: [CommonModule],
	declarations: [B2bNgxImageDirective],
	exports: [B2bNgxImageDirective],
})
export class B2bNgxImageModule {}
