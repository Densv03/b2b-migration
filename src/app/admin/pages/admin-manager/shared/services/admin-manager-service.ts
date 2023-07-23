import { Injectable } from "@angular/core";
import { ApiService } from "../../../../../core/services/api/api.service";
import { Observable } from "rxjs";

export interface Manager {
	firstName: string;
	refId: number;
	lastName: string;
}

@Injectable({
	providedIn: "root",
})
export class AdminManagerService {
	constructor(private apiService: ApiService) {}

	public addManager(firstName: string, lastName: string): Observable<any> {
		return this.apiService.post("managers/add-new-manager", { firstName, lastName });
	}

	public getUsersByRefId(refId: number): Observable<any> {
		return this.apiService.get(`statistics/get-users-list?refId=${refId}`);
	}

	public deleteManagerById(refId: string): Observable<any> {
		return this.apiService.delete(`managers/delete-manager?refId=${refId}`);
	}

	public getManagers(refId?: string): Observable<any> {
		if (refId) {
			return this.apiService.get(`managers/get-managers?refId=${refId}`);
		} else {
			return this.apiService.get("managers/get-managers");
		}
	}
}
