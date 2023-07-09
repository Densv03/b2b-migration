import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import {CategoriesState, CategoriesStore} from "./categories.store";

@Injectable({ providedIn: "root" })
export class CategoriesQuery extends Query<CategoriesState> {
	public readonly selectCategories$: Observable<any>;
	public readonly selectWikiCategories$: Observable<any>;
	constructor(protected override store: CategoriesStore) {
		super(store);

		this.selectCategories$ = this.select("categories");
		this.selectWikiCategories$ = this.select("wikiCategories");
	}
}
