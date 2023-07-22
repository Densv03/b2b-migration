import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxChipsModule } from "@b2b/ngx-chips";
import { B2bNgxCountrySelectModule } from "@b2b/ngx-country-select";
import { B2bNgxFileModule } from "@b2b/ngx-file";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { TranslocoModule } from "@ngneat/transloco";
import { AdminBlogPostRoutingModule } from "./admin-blog-post-routing.module";
import { AdminBlogPostComponent } from "./layout/admin-blog-post.component";

@NgModule({
	declarations: [AdminBlogPostComponent],
	imports: [
		CommonModule,
		AdminBlogPostRoutingModule,
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
export class AdminBlogPostModule {}
