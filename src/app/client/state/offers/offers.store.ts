import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface OffersState {
	allOffers: any;
	myOffers: any;
	offer: any;
	savedOffers: any;
	allOffersCount: number;
	seaLines: any;
}

export function createInitialState(): OffersState {
	return {
		allOffers: [],
		myOffers: [],
		offer: null,
		savedOffers: [],
		allOffersCount: 0,
		seaLines: [],
	};
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "offers" })
export class OffersStore extends Store<OffersState> {
	constructor() {
		super(createInitialState());
	}
}
