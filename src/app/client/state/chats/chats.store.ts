import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface ChatsState {
	chats: any;
}

export function createInitialState(): ChatsState {
	return {
		chats: null,
	};
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "chats" })
export class ChatsStore extends Store<ChatsState> {
	constructor() {
		super(createInitialState());
	}
}
