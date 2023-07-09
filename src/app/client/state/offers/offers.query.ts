import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import {OffersState, OffersStore} from "./offers.store";

@Injectable({ providedIn: "root" })
export class OffersQuery extends Query<OffersState> {
	public readonly selectAllOffers$: Observable<any>;
	public readonly selectMyOffers$: Observable<any>;
	public readonly selectOffer$: Observable<any>;
	public readonly selectSavedOffers$: Observable<any>;
	public readonly selectAllOffersCount$: Observable<any>;
	public readonly selectSeaLines$: Observable<any>;

	constructor(protected override store: OffersStore) {
		super(store);

		this.selectAllOffers$ = this.select("allOffers");
		this.selectMyOffers$ = this.select("myOffers");
		this.selectOffer$ = this.select("offer");
		this.selectSavedOffers$ = this.select("savedOffers");
		this.selectAllOffersCount$ = this.select("allOffersCount");
		this.selectSeaLines$ = this.select("seaLines");
	}
}
