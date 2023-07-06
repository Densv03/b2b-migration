import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface TransportTypesState {
	transportTypes: any;
}

export function createInitialState(): TransportTypesState {
	return {
		transportTypes: [],
	};
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "transport-types" })
export class TransportTypesStore extends Store<TransportTypesState> {
	constructor() {
		super(createInitialState());
	}
}
