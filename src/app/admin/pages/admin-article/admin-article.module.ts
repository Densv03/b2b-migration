import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminArticleRoutingModule } from "./admin-article-routing.module";
import { AdminArticleComponent } from "./layout/admin-article.component";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxFileModule } from "@b2b/ngx-file";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
import { B2bNgxChipsModule } from "@b2b/ngx-chips";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [AdminArticleComponent],
	imports: [
		CommonModule,
		AdminArticleRoutingModule,
		B2bNgxInputModule,
		B2bNgxFileModule,
		B2bNgxSelectModule,
		B2bNgxButtonModule,
		B2bNgxCountrySelectModule,
		AngularEditorModule,
		ReactiveFormsModule,
		B2bNgxChipsModule,
		TranslocoModule,
	],
})
export class AdminArticleModule {}
