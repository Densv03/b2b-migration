import { Injectable } from "@angular/core";

import { Observable, takeWhile } from "rxjs";
import {first, map} from "rxjs/operators";

import { CategoriesPaginationModel } from "../../pages/client-marketplace/shared/models/categories-pagination.model";
import {ApiService} from "../../../core/services/api/api.service";
import {CategoriesQuery} from "../../state/categories/categories.query";
import {CategoriesStore} from "../../state/categories/categories.store";

@Injectable({
	providedIn: "root",
})
export class CategoriesService {
	public readonly endpoint: string;

	constructor(
		private readonly _apiService: ApiService,
		private readonly _categoriesStore: CategoriesStore,
		private readonly _categoriesQuery: CategoriesQuery
	) {
		this.endpoint = "categories/";
		this.getCategories();
	}

	public getCategories(): Observable<any> {
		const { categories } = this._categoriesQuery.getValue();
		if (!categories?.categories.length || !categories?.totalCount) {
			this._apiService
				.get(this.endpoint)
				.subscribe((response: any) => {
					this._categoriesStore.update({
						categories: response,
					});
				});
		}

		return this._categoriesQuery.selectCategories$;
	}

	public updateCategory(id: any, name: any, hide: any) {
		return this._apiService.put(`category/${id}/update`, {
			...(name ? { name } : {}),
			hide,
		});
	}

	public createCategory(level1Category: any, level2Category: any, level3Category: any) {
		return this._apiService.post(`category/create`, {
			category: {
				...level1Category,
				category: {
					...level2Category,
					category: level3Category,
				},
			},
		});
	}

	public updateWikiCategory(id: any, name: any, hide: any) {
		return this._apiService.put(`categoryPost/${id}/update`, {
			...(name ? { name } : {}),
			hide: !hide,
		});
	}

	public createWikiCategory(level1Category: any, level2Category: any) {
		return this._apiService.post(`categoryPost/create`, {
			category: {
				...level1Category,
				category: level2Category,
			},
		});
	}

	public getWikiCategories() {
		const { wikiCategories } = this._categoriesQuery.getValue();

		if (!wikiCategories.length) {
			this._apiService
				.get("categoryPosts")
				.subscribe((response: any) => {
					this._categoriesStore.update({
						wikiCategories: response,
					});
				});
		}

		return this._categoriesQuery.selectWikiCategories$;
	}

	public getCategoryNameById(categoryId: string): Observable<string> {
		return this.getCategories().pipe(
			takeWhile(({ categories }) => !categories.length, true),
			map(({ categories }) => {
				for (const parentCategory of categories) {
					if (parentCategory._id === categoryId) {
						return parentCategory.name
					}
					for (const childCategory of parentCategory.children) {
						if (childCategory._id === categoryId) {
							return childCategory.name;
						}
					}
				}
			}),
		);
	}
}
