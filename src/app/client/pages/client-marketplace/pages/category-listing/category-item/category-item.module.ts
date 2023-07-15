import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryItemComponent } from "./category-item.component";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxIconModule } from "@b2b/ngx-icon";

@NgModule({
	declarations: [CategoryItemComponent],
	exports: [CategoryItemComponent],
	imports: [CommonModule, B2bNgxImageModule, B2bNgxIconModule],
})
export class CategoryItemModule {}
