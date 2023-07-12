import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxPaginationComponent } from "./layout/ngx-pagination.component";

@NgModule({
	imports: [CommonModule],
	declarations: [B2bNgxPaginationComponent],
	exports: [B2bNgxPaginationComponent],
})
export class B2bNgxPaginationModule {}
