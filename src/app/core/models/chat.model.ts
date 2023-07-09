import { User } from "./user/user.model";

export interface Chat {
	_id: string;
	contactsRequested: boolean;
	isActive: boolean;
	seller: User;
	buyer: User;
	// offer:
}
