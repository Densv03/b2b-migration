import {Amount} from "../amount.model";
import {Contact} from "../contact.model";
import {Visibility} from "../visibility.model";
import {Category} from "../category.model";
import {Photo} from "../photo.model";


export interface MarketProductModel {
	chatStarted: string[],
	reasonForDeletion: string
	price: Price;
	amount: Amount;
	contact: Contact;
	visibility: Visibility;
	shipping: string[];
	paymentMethods: string[];
	highDemand: boolean;
	priceDrop: boolean;
	chatCreated: boolean;
	savedCount: number;
	views: number;
	viewedBy: string[];
	openedFor: any[];
	status: string;
	productApproved: boolean;
	productRejected: boolean;
	_id: string;
	description: string;
	title: string;
	specifications: string;
	country: string;
	category: Category[];
	suppliersType: string;
	user: string;
	photos: Photo[];
	documents: any[];
	createdAt: Date;
	updatedAt: Date;
	hidden: boolean;
}

export interface Price {
	old: number;
}
