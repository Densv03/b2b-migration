import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface WikiState {
	articles: any;
}

export function createInitialState(): WikiState {
	return {
		articles: null,
	};
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "wiki" })
export class WikiStore extends Store<WikiState> {
	constructor() {
		super(createInitialState());
	}
}
