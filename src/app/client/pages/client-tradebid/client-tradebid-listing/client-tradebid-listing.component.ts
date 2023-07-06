import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

import {BehaviorSubject, Observable, of} from "rxjs";
import { map } from "rxjs/operators";

import { FormBuilder } from "@ngneat/reactive-forms";

import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { CategoriesService } from "../../../services/categories/categories.service";
import { ApiService } from "../../../../core/services/api/api.service";
import { TradebidService } from "../tradebid.service";
import { UserService } from "../../client-profile/services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";

function generateQueryString(obj) {
	return Object.entries(obj)
		.filter(([, value]: any) => !!value)
		.reduce((queryString: string, [key, value]: any) => {
			return Array.isArray(value)
				? `${queryString}${value.reduce((str, arrayItem) => `${str}${key}=${arrayItem}&`, "")}`
				: `${queryString}${key}=${value}&`;
		}, "?");
}

@Component({
	selector: "b2b-client-tradebid-listing",
	templateUrl: "./client-tradebid-listing.component.html",
	styleUrls: ["./client-tradebid-listing.component.scss"],
})
export class ClientTradebidListingComponent implements OnInit {
	public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	public formGroup: FormGroup = this.createFromGroup();
	public readonly rfqQuotesCounter: number;

	public categories$: Observable<any> = this.getCategories();
	public savedSearches$: Observable<any> = this.getSavedSearches();

	public totalLength$: Observable<number> = this.tradebidService.rfqListLength$;

	private filteredQueryObj: any = { limit: 10, offset: 0 };
	private currentPageSource: BehaviorSubject<number> = new BehaviorSubject<number>(1)

	constructor(
		private formBuilder: FormBuilder,
		private categoriesService: CategoriesService,
		private apiService: ApiService,
		private tradebidService: TradebidService,
		private userService: UserService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.rfqQuotesCounter = this.userService.getUser()?.rfqQuotes;
	}

	ngOnInit(): void {
		this.updateRfqListSource(this.filteredQueryObj);
		this.tradeBidPageInit();
	}

	public get currentPage$(): Observable<number> {
		return this.currentPageSource.asObservable();
	}

	public onSubmit(form: FormGroup): void {
		if (!this.userService.isAuth()) {
			this.router.navigate(["auth/log-in"]);
			return;
		}

		const requestParams = this.getParamsToRequest(form);
		if (requestParams && Object.values(requestParams).length) {
			this.filteredQueryObj = { ...requestParams, limit: 10, offset: 0 };
			this.updateRfqListSource(this.filteredQueryObj);
			form.reset();
		} else if (!Object.values(requestParams).length) {
			this.filteredQueryObj = { limit: 10, offset: 0 };
			this.updateRfqListSource(this.filteredQueryObj);
		}
	}

	public togglePageNumber(page: number): void {
		this.filteredQueryObj = { ...this.filteredQueryObj, offset: (page - 1) * 10 };
		this.updateRfqListSource(this.filteredQueryObj);

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: {
				page,
			},
			queryParamsHandling: "merge"
		});

		this.currentPageSource.next(page);
	}

	private updateRfqListSource(queryObject: any): void {
		this.tradebidService.updateRfqList(generateQueryString(queryObject));
	}

	private getParamsToRequest(form: FormGroup) {
		const params: any = {};
		let emptyObject: boolean = true;
		const formValue = form.value;
		Object.entries(formValue).forEach(([key, value]: [string, string | string[]]) => {
			if (value) {
				if (key === "searchText") {
					params["q"] = value;
					emptyObject = false;
				} else if (key === "categories[]") {
					if (value.length) {
						params["categories[]"] = value;
						emptyObject = false;
					}
				} else if (key === "country") {
					params["destinationTo"] = value;
					emptyObject = false;
				}
			}
		});

		return emptyObject ? {} : params;
	}

	private createFromGroup(): FormGroup {
		return this.formBuilder.group({
			"searchText": [null],
			"categories[]": [null],
			"country": [null],
		});
	}

	private getSavedSearches(): Observable<any> {
		return of(["Saved search 1", "Saved search 2"]);
	}

	private getCategories(): Observable<any> {
		return this.categoriesService
			.getCategories()
			.pipe(map(({ categories }) => categories.map((category) => ({ id: category._id, value: category.name }))));
	}

	private tradeBidPageInit(): void {
		let page = this.route.snapshot.queryParams.page;
		if (!page) {
			this.router.navigate([], {
				relativeTo: this.route,
				queryParams: {
					page: 1,
				},
				queryParamsHandling: "merge"
			});
			page = 1
		}

		this.togglePageNumber(+page);
	}
}
