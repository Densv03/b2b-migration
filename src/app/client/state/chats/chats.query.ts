import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { ChatsState, ChatsStore } from "apps/site/src/app/client/state/chats/chats.store";

@Injectable({ providedIn: "root" })
export class ChatsQuery extends Query<ChatsState> {
	public readonly selectChats: Observable<any>;
	constructor(protected store: ChatsStore) {
		super(store);

		this.selectChats = this.select("chats");
	}
}
