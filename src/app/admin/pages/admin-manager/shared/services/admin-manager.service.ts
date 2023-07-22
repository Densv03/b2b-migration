import { Injectable } from "@angular/core";
import { HttpEvent } from "@angular/common/http";

import { Observable } from "rxjs";

import { ApiService } from "../../../../../core/services/api/api.service";

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

	public addManager(firstName: string, lastName: string, url: string): Observable<any> {
		return this.apiService.post("managers/add-new-manager", { firstName, lastName, url });
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
