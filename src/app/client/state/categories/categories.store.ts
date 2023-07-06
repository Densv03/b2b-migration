import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface CategoriesState {
	categories: any;
	wikiCategories: any;
}

export function createInitialState(): CategoriesState {
	return {
		categories: {
			categories: [],
			totalCount: 0,
		},
		wikiCategories: [],
	};
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "categories" })
export class CategoriesStore extends Store<CategoriesState> {
	constructor() {
		super(createInitialState());
	}
}
