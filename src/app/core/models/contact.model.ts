import { Phone } from "./user/phone.model";

export interface Contact {
	phone: Phone;
	companyName: string;
	personName: string;
	email: string;
}
