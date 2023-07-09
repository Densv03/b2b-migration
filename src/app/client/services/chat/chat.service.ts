import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { ApiService } from "../../../core/services/api/api.service";

@Injectable({
	providedIn: "root",
})
export class ChatService {
	constructor(private readonly _apiService: ApiService) {}

	public getChatById(id: string) {
		return this._apiService.get(`my/chat/${id}`).pipe(
			map((chat: any) => (Array.isArray(chat) ? chat[0] : chat)),
			map((chat) => ({
				...chat,
				offer: Array.isArray(chat.offer) ? chat.offer[0] : chat.offer,
			}))
		);
	}
}
