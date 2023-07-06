import { Injectable } from "@angular/core";
import { filter, map } from "rxjs/operators";

import { User } from "../../../../../core/models/user/user.model";
import { Observable, share } from "rxjs";
import { ADMIN_ID, MANUFACTURER_ID, TRADER_ID } from "../../../../../core/helpers/constant/role-ids";
import {ApiService} from "../../../../../core/services/api/api.service";
import {AuthQuery} from "../../../../../auth/state/auth/auth.query";
import {AuthStore} from "../../../../../auth/state/auth/auth.store";

@Injectable({
	providedIn: "root",
})
export class UserService {
	constructor(
		private readonly _apiService: ApiService,
		private readonly _authQuery: AuthQuery,
		private readonly _authStore: AuthStore
	) {}

	public isAuth(): boolean {
		return !!localStorage.getItem("token");
	}

	public getUsers(offset: any, limit = 10, filters: any) {
		const filtersUrl = filters
			? Object.entries(filters).reduce((pre, [key, val]) => {
					const parsedValue = val && !Array.isArray(val) ? (val as any).replace("&", "%26") : val;
					return pre + (val ? `&${key}=${parsedValue}` : "");
			  }, "")
			: "";

		return this._apiService.get(`users?offset=${offset * limit}&limit=10${filtersUrl}`);
	}

	public getUsersCsv(offset: any, limit = 10, filters: any) {
		const httpOptions = {
			responseType: "blob" as "json",
		};

		const filtersUrl = filters
			? Object.entries(filters).reduce((pre, [key, val]) => {
					return pre + (val ? `&${key}=${val}` : "");
			  }, "")
			: "";

		// return this._apiService.get(`users-csv?offset=${offset * limit}&limit=${limit}${filtersUrl}`, httpOptions);
		return this._apiService.get(`users-csv?${filtersUrl}`, httpOptions);
	}

	public getToken$() {
		return this._authQuery.selectToken$;
	}

	public getUser$(): Observable<User> {
		return this._authQuery.selectUser$.pipe(filter((user) => !!user));
	}

	public getToken() {
		return this._authStore.getValue().token;
	}

	public getUserById(id: any): Observable<User> {
		return this._apiService.get(`user/${id}`);
	}

	public getUser(): User {
		return this._authQuery.getValue().user;
	}

	public updateUserById(id: any, settings: any, options = {}) {
		const url = `user/${id}/update`;
		return this._apiService.put(url, settings, options);
	}

	public updateUserQuotes(userId: string, rfqNumb: number): Observable<any> {
		return this._apiService.put("user/update-user-rfq-quotes", { userId, rfqNumb });
	}

	public updateUserSettings(settings: any) {
		const url = "profile/update";
		return this._apiService.put(url, settings);
	}

	public updateUserEmail(settings: { emailOld: string; emailNew: string }) {
		const url = "auth/changeRegisterMail";
		return this._apiService.post(url, settings);
	}

	public updatePassword(password: any) {
		const url = "password-reset";
		return this._apiService.put(url, password);
	}

	public deleteUserById(id: any) {
		return this._apiService.delete(`user/${id}/delete`);
	}

	public deleteUser(body?: any) {
		return this._apiService.delete(`user/deleteAccount`, body);
	}

	public addUserStatistics({
		userId,
		refId,
		email,
		typeRegistration,
	}: {
		userId: string;
		refId: number;
		email?: string;
		typeRegistration: "standard" | "socials";
	}): Observable<any> {
		return this._apiService.post("statistics/add-new-entry", { userId, refId, email, typeRegistration });
	}

	public getPublicUserInfo(userId: string): Observable<any> {
		return this._apiService.get<any>(`users/info?usersId=[${userId}]`).pipe(
			filter((data) => !!data),
			map((data: any) => data.users[0])
		);
	}

	public getTotalUsersAmount(): Observable<number> {
		return this._apiService.get<number>("users/count").pipe(
			filter((data) => !!data),
			share()
		);
	}

	public get isUserAbleToUseMarketplace(): boolean {
		return (
			this.getUser().role._id === ADMIN_ID ||
			this.getUser().role._id === MANUFACTURER_ID ||
			this.getUser().role._id === TRADER_ID
		);
	}

	public changeRole(token: string, newRoleId: string, newRootRoleId: string) {
		return this._apiService.post("auth/changeRole", {}, { params: { token, newRoleId, newRootRoleId } });
	}

	public updateUserRoleById(userId: string, newRoleId: string): Observable<any> {
		return this._apiService.put("user/change-user-role", { userId, newRoleId });
	}
}
