import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { WikiState, WikiStore } from "./wiki.store";

@Injectable({ providedIn: "root" })
export class WikiQuery extends Query<WikiState> {
	public readonly selectArticles: Observable<any>;
	constructor(protected store: WikiStore) {
		super(store);

		this.selectArticles = this.select("articles");
	}
}
