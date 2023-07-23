import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminArticleCategoriesRoutingModule } from "./admin-article-categories-routing.module";
import { AdminArticleCategoriesComponent } from "./layout/admin-article-categories.component";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { B2bNgxToggleModule } from "@b2b/ngx-toggle";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [AdminArticleCategoriesComponent],
	imports: [
		CommonModule,
		B2bNgxInputModule,
		B2bNgxButtonModule,
		B2bNgxSelectModule,
		B2bNgxToggleModule,
		ReactiveFormsModule,
		AdminArticleCategoriesRoutingModule,
		TranslocoModule,
	],
})
export class AdminArticleCategoriesModule {}
