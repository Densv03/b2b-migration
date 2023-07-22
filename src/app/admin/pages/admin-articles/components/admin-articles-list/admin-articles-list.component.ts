import { Component, Input } from "@angular/core";

@Component({
	selector: "app-admin-articles-list",
	templateUrl: "./admin-articles-list.component.html",
	styleUrls: ["./admin-articles-list.component.scss"],
})
export class AdminArticlesListComponent {
	@Input() articles: any[];
	@Input() menuOptions: any[];
}
