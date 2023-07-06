import {Phone} from "../../../../core/models/user/phone.model";

export interface BasicInfoInterface {
	fullName: string;
	phone: Phone;
	company: string;
	country: string;
}
