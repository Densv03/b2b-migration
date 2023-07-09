import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientBlogArticleRoutingModule } from "./client-blog-article-routing.module";
import { B2bNgxSocialMediasModule } from "@b2b/ngx-social-medias";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxTextareaModule } from "@b2b/ngx-textarea";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ReactiveFormsModule } from "@angular/forms";
import { ShareModule } from "ngx-sharebuttons";
import { TranslocoModule } from "@ngneat/transloco";
import { ClientBlogArticleComponent } from "./layout/client-blog-article.component";

@NgModule({
	declarations: [ClientBlogArticleComponent],
	imports: [
		CommonModule,
		ClientBlogArticleRoutingModule,
		ReactiveFormsModule,
		B2bNgxSocialMediasModule,
		B2bNgxImageModule,
		B2bNgxButtonModule,
		B2bNgxTextareaModule,
		B2bNgxIconModule,
		ShareModule,
		TranslocoModule,
	],
})
export class ClientBlogWikiArticleModule {}
