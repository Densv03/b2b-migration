import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {PaginationParamsModel} from "../../../../core/models/pagination-params.model";
import {ApiService} from "../../../../core/services/api/api.service";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminCompaniesService {

	private adminCompaniesListSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	private adminCompaniesCountSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private apiService: ApiService) { }

	public get adminCompaniesList$(): Observable<any> {
		return this.adminCompaniesListSource.asObservable();
	}

	public get adminCompaniesCount$(): Observable<number> {
		return this.adminCompaniesCountSource.asObservable();
	}

	public updateAdminCompaniesList(paginationModel: PaginationParamsModel, otherParams?: any): void {
		this.getAdminCompaniesList(paginationModel, otherParams)
			.pipe(first())
			.subscribe(data => {
				this.adminCompaniesCountSource.next(data.totalCount);
				this.adminCompaniesListSource.next(data.companies);
			})
	}

	private getAdminCompaniesList(paginationModel: PaginationParamsModel, otherParams?: any): Observable<any> {
		return this.apiService.get('products/get-company', {
			params: {
				...paginationModel,
				...otherParams
			}
		});
	}
}
