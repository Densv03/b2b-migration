export interface PaymentInfo {
	customerProfileId: number;
	email: string;
	postCode: string;
	typeCard: "Visa" | "MasterCard";
	cardNumber: number;
	customerPaymentProfileId: number;
}
