import { TransportType } from "./transport-type.model";
import { Amount } from "./amount.model";
import { Price } from "./price.model";
import { Destination } from "./destination.model";
import { Visibility } from "./visibility.model";
import { Location } from "./location.model";
import { Category } from "./category.model";

export interface Offer {
	_id: string;
	contact: any;
	verifiedTrack: boolean;
	highDemand: boolean;
	priceDrop: boolean;
	chatCreated: boolean;
	savedCount: number;
	views: number;
	viewedBy: string[];
	openedFor: string[];
	chatStarted: string[];
	status: "new" | "arrived" | "sold";
	offerApproved: boolean;
	offerRejected: string;
	title: string;
	description: string;
	container: string;
	transportType: TransportType;
	category: Category;
	amount: Amount;
	price: Price;
	destination: Destination;
	visibility: Visibility;
	seaLine: string;
	location: Location;
	reasonForDeletion?:
		| "I sold a cargo at B2B Discount"
		| "I sold a cargo elsewhere"
		| "I don't sell cargo anymore"
		| "Deleted by admin";
	hidden?: boolean;
	userTypeWhoHideOffer?: "admin" | "user" | null;
	// TODO: complete offer model
}
