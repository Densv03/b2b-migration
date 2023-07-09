export interface Subscriptions {
	_id: string;
	userId: string;
	offerId: string;
	transactionId: string;
	type: string;
	expiredDate: Date;
	createdDate: Date;
}
