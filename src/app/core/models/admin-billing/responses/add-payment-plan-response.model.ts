export interface AddPaymentPlanResponse {
	_id: string;
	typePlan: "subscription" | "quotes";
	title: string;
	price: number;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	amountOfQuotes?: number;
}
