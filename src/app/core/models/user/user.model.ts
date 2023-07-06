import { Phone } from "./phone.model";
import { PaymentInfo } from "./payment-info.model";
import { Subscriptions } from "./subscriptions.model";
import { Offer } from "../offer.model";
import { Logo } from "./logo.model";
import {B2bAuthRoleInterface} from "../../../../../projects/shared/src/interfaces/b2b-auth-role.interface";
import {B2bAuthRootRoleInterface} from "../../../../../projects/shared/src/interfaces/b2b-auth-root-role.interface";

export interface User {
	rfqQuotes: number;
	logo?: Logo;
	company: string;
	countConnection: number;
	// TODO: make enum for countries
	country: string;
	deleteAccount: boolean;
	email: string;
	emailConfirmed: boolean;
	favourites: Offer[];
	firstLogin: boolean;
	fullName: string;
	mailSubscribed: boolean;
	online: boolean;
	phone: Phone;
	preferences: string[];
	// TODO: set Array type
	preferredCargo: string[];
	role: B2bAuthRoleInterface;
	sessionTokens: string[];
	site: string;
	socialAuth: boolean;
	// TODO: make type for authTypes
	socialAuthType: "google" | "linkedin" | null;
	createdAt: string;
	updatedAt: Date;
	deletedDate: Date;
	_id: string;
	paymentInfo: PaymentInfo;
	reasonForDeleting: string;
	subscriptions: Subscriptions;
	rootRole?: B2bAuthRootRoleInterface;
	statistics: {
		offers: {
			created: number;
			deleted: number;
		},
		products: {
			created: number;
			deleted: number;
		},
		rfq: {
			created: number;
			deleted: number;
		}
	}
}
