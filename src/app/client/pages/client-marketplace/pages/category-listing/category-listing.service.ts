import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, Observable } from "rxjs";
import { ApiService } from "../../../../../core/services/api/api.service";
import { PaginationParamsModel } from "../../../../../core/models/pagination-params.model";
import { Category } from "../../shared/models/category.model";
import { CategoriesPaginationModel } from "../../shared/models/categories-pagination.model";
import { map } from "rxjs/operators";

const CATEGORIES_AMOUNT_PER_VIEW = 16;

@Injectable({
	providedIn: "root",
})
export class CategoryListingService {
	private listingCategoriesSource: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
	private listingCategoriesCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	constructor(private apiService: ApiService) {
		this.updatePresentCategoriesSource();
	}

	public getCategoriesViewAmount(): number {
		return CATEGORIES_AMOUNT_PER_VIEW;
	}

	public get presentCategoriesSource$(): Observable<Category[]> {
		return this.listingCategoriesSource.asObservable();
	}

	public get presentCategoriesCount$(): Observable<number> {
		return this.listingCategoriesCount.asObservable();
	}

	public getPresentCategories(queryObj?: PaginationParamsModel): Observable<CategoriesPaginationModel> {
		if (queryObj) {
			const {limit, offset} = queryObj;
			return this.apiService
				.get<CategoriesPaginationModel>("categories/", {
					params: {limit, offset},
				})
				.pipe(filter((data) => !!data));
		}
		return this.apiService.get<CategoriesPaginationModel>("categories/").pipe(filter((data) => !!data));
	}

	public updatePresentCategoriesSource(queryParams?: PaginationParamsModel): void {
		this.getPresentCategories(queryParams).subscribe(({categories, totalCount}: CategoriesPaginationModel) => {
			this.listingCategoriesSource.next(categories);
			this.listingCategoriesCount.next(totalCount);
		});
	}

	public getCategoryNamesArr(categoryIds: string[]): Observable<string[]> {
		return this.getPresentCategories()
			.pipe(
				map(({categories}) => {
					return categories.reduce((acum, val) => {
						if (categoryIds.includes(val._id)) {
							acum.push(val.name)
						} else {
							val.children.forEach(item => {
								categoryIds.includes(item._id) ? acum.push(item.name) : null
							})
						}
						return acum
					}, [])
				})
			)

	}
}
