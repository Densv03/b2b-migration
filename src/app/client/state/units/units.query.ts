import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { UnitsState, UnitsStore } from "./units.store";

@Injectable({ providedIn: "root" })
export class UnitsQuery extends Query<UnitsState> {
	public readonly selectUnits$: Observable<any>;
	constructor(protected store: UnitsStore) {
		super(store);

		this.selectUnits$ = this.select("units");
	}
}
