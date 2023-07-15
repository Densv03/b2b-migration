import { NgModule } from "@angular/core";
import { LoadMorePaginatorComponent } from "./load-more-paginator.component";
import { B2bNgxIconModule } from "@b2b/ngx-icon";

@NgModule({
	declarations: [LoadMorePaginatorComponent],
	exports: [LoadMorePaginatorComponent],
	imports: [B2bNgxIconModule],
})
export class LoadMorePaginatorModule {}
