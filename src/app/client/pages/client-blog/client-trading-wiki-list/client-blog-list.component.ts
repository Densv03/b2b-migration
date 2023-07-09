import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import {B2bNgxLinkService, B2bNgxLinkThemeEnum} from "@b2b/ngx-link";
import { Observable } from "rxjs";
import { BlogService } from "../../../services/blog/blog.service";
import {environment} from "../../../../../environments/environment";

@Component({
	selector: "b2b-client-blog-list",
	templateUrl: "./client-blog-list.component.html",
	styleUrls: ["./client-blog-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientBlogListComponent {
	public blogList$: Observable<any> = this.blogService.blog$;

	constructor(private blogService: BlogService,
							public readonly b2bNgxLinkService: B2bNgxLinkService) {
	}
	getLink(option: any) {
		return option?.path ? '/blog/' + option.path : '/blog/' + option._id
	}
}
