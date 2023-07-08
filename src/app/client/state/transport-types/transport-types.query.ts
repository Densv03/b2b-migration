import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { TransportTypesState, TransportTypesStore } from "./transport-types.store";

@Injectable({ providedIn: "root" })
export class TransportTypesQuery extends Query<TransportTypesState> {
	public readonly selectTransportTypes$: Observable<any>;
	constructor(protected override store: TransportTypesStore) {
		super(store);

		this.selectTransportTypes$ = this.select("transportTypes");
	}
}
