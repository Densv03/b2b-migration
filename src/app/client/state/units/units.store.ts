import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface UnitsState {
	units: any;
}

export function createInitialState(): UnitsState {
	return {
		units: [],
	};
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "units" })
export class UnitsStore extends Store<UnitsState> {
	constructor() {
		super(createInitialState());
	}
}
