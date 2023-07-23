import {Component, OnInit} from '@angular/core';
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import {map} from "rxjs/operators";
import {AdminCompaniesService} from "../services/admin-companies.service";
import {PaginationParamsModel} from "../../../../core/models/pagination-params.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
	selector: 'b2b-admin-companies',
	templateUrl: './admin-companies.component.html',
	styleUrls: ['./admin-companies.component.scss']
})
export class AdminCompaniesComponent implements OnInit {
	public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public productsLimit = 20;
	public filtersForm: FormGroup = this.fb.group({
		q: null,
		registrationDate: this.fb.control({
			startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
			endDate: new Date(Date.now()).toISOString(),
		}),
		country: [null]
	});

	public adminCompaniesCount$ = this.adminCompaniesService.adminCompaniesCount$;
	public adminCompaniesList$ = this.adminCompaniesService.adminCompaniesList$;
	public displayedColumns = ['companyName', 'countChats', 'countProducts', 'createdAt'];
	private currentFilters: any = null;
	private filteredQueryObj: PaginationParamsModel = {limit: this.productsLimit, offset: 0}

	constructor(private fb: FormBuilder,
							private adminCompaniesService: AdminCompaniesService) {
	}
	ngOnInit(): void {
		this.updateCompaniesListOnFiltersChange();
		this.filtersForm.get('registrationDate').updateValueAndValidity();
	}
	private removeFalsyKeysFromObject(object: {[key: string]: any}): any {
		for(const key in object) {
			if(!object[key]) delete object[key];
		}
		return object;
	}

	public updateCompaniesListOnFiltersChange(): void {
		this.filtersForm.valueChanges.pipe(
			map(data => {
				if (data.registrationDate.startDate) {
					const date = new Date(data.registrationDate.startDate);
					data.registrationDate.startDate =
						new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
				}
				if (data.registrationDate.endDate) {
					data.registrationDate.endDate = new Date(data.registrationDate.endDate).toISOString();
				}
				if (!data.q) {
					delete data.q;
				}

				data.dateFrom = data.registrationDate.startDate;
				data.dateTo = data.registrationDate.endDate;
				delete data.registrationDate;
				return data;
			})
		).subscribe((filters: { [key: string]: any; }) => {
			this.onFiltersChange();
			this.adminCompaniesService.updateAdminCompaniesList(this.filteredQueryObj, {...this.removeFalsyKeysFromObject(filters)});
			this.currentFilters = filters;
		});
	}


	public togglePage(page: number): void {
		this.filteredQueryObj = {...this.filteredQueryObj, offset: (page - 1) * this.productsLimit};
		this.adminCompaniesService.updateAdminCompaniesList(this.filteredQueryObj, {...this.currentFilters});
	}

	private onFiltersChange(): void {
		this.filteredQueryObj = {limit: this.productsLimit, offset: 0};
		this.currentFilters = null;
	}
}
