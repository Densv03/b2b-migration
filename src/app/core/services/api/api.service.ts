import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	constructor(private readonly httpClient: HttpClient) {}

	public get<T>(url: string, httpOptions = {}) {
		return this.httpClient.get<T>(environment.apiUrl + url, httpOptions);
	}

	public post<T>(url: string, body: unknown, options?: any) {
		return this.httpClient.post<T>(environment.apiUrl + url, body, options);
	}

	public put<T>(url: string, body: unknown, options = {}) {
		return this.httpClient.put<T>(environment.apiUrl + url, body, options);
	}

	public patch<T>(url: string, body: unknown) {
		return this.httpClient.patch<T>(environment.apiUrl + url, body);
	}

	public delete(url: string, options?: any) {
		return this.httpClient.delete(environment.apiUrl + url, options);
	}
}
