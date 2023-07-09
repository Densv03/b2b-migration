import { Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api/api.service";
import * as CryptoJS from "crypto-js";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class PaymentService {
	constructor(private readonly apiService: ApiService) {}

	public createCustomerProfile(data: any): Observable<any> {
		const body = {
			hashData: CryptoJS.AES.encrypt(JSON.stringify(data), "vDS8h!ds#32df").toString(),
		};

		return this.apiService.post("authorize-net/create-customer-profile", body);
	}
	public updateCustomerProfile(data: any): Observable<any> {
		const body = {
			hashData: CryptoJS.AES.encrypt(JSON.stringify(data), "vDS8h!ds#32df").toString(),
		};
		return this.apiService.post("authorize-net/update-payment-by-profile", body);
	}

	public createPaymentByProfile(body: { amount: number | string; type: string; quotesNumb?: number }): Observable<any> {
		return this.apiService.post("authorize-net/create-payment-by-profile", body);
	}

	public getInvoices(): Observable<any> {
		return this.apiService.get(`authorize-transactions`);
	}

	public getTokenForPurchaseConfirm(body: any): Observable<any> {
		return this.apiService.post("authorize-net/get-hosted-payment-page-request", body);
	}
}
