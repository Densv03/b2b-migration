export interface AddPaymentPlanBody {
	typePlan: "subscription" | "quotes";
	title: string;
	price: number;
	description: string;
	amountOfQuotes?: number;
}
