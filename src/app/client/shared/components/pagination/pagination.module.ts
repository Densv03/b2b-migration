import {NgModule} from "@angular/core";
import {PaginationComponent} from "./pagination.component";
import {CommonModule} from "@angular/common";
import {B2bNgxIconModule} from "@b2b/ngx-icon";

@NgModule({
	declarations: [PaginationComponent],
    imports: [CommonModule, B2bNgxIconModule],
	exports: [
		PaginationComponent
	]
})

export class PaginationModule {}
