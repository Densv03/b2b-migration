import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxBackComponent } from "./layout/ngx-back.component";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { RouterModule } from "@angular/router";

@NgModule({
	imports: [CommonModule, RouterModule, B2bNgxIconModule, B2bNgxLinkModule],
	declarations: [NgxBackComponent],
	exports: [NgxBackComponent],
})
export class B2bNgxBackModule {}
