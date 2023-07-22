import { Component, Input } from "@angular/core";

@Component({
	selector: "b2b-admin-blog-list",
	templateUrl: "./admin-blog-list.component.html",
	styleUrls: ["./admin-blog-list.component.scss"],
})
export class AdminBlogListComponent {
	@Input() articles: any[];
	@Input() menuOptions: any[];
}
