import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxDropdownComponent } from "./layout/ngx-dropdown.component";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxButtonModule } from "@b2b/ngx-button";

@NgModule({
	imports: [CommonModule, B2bNgxIconModule, B2bNgxButtonModule],
	declarations: [B2bNgxDropdownComponent],
	exports: [B2bNgxDropdownComponent],
})
export class B2bNgxDropdownModule {}
