import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTabGroup} from "@angular/material/tabs";
import {BehaviorSubject, EMPTY, filter, Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {map, take} from "rxjs/operators";
import { SelectCategoryModel } from "../select-category.model";
import {CategoriesService} from "../../../../services/categories/categories.service";
import { B2bNgxButtonThemeEnum } from '@b2b/ngx-button';

@Component({
  selector: 'b2b-categories-popup-component',
  templateUrl: './categories-popup.component.html',
  styleUrls: ['./categories-popup.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPopupComponent implements OnInit {

	public B2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public demo1TabIndex = 1;

	public isMultipleMode = this.data.multiple === undefined ? true : this.data.multiple;

	@ViewChild("demo3Tab", { static: false }) demo3Tab: MatTabGroup | undefined;

	private categoriesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { selectedCategories: Array<string>; required?: boolean; multiple?: boolean },
		public dialogRef: MatDialogRef<CategoriesPopupComponent>,
		private categoriesService: CategoriesService,
	) {}

	ngOnInit(): void {
		this.categoriesService
			.getCategories()
			.pipe(
				filter(data => !!data),
				map((categoriesData) => categoriesData.categories),
				map((categories) =>
					categories.map((category: { name: any; _id: any; children: any[]; }) => ({
						text: category.name,
						value: category._id,
						checked: false,
						children: category.children.map((level2Category) => ({
							text: level2Category.name,
							value: level2Category._id,
							checked: false,
							parentId: category._id,
							visible: true,
						})),
					}))
				),
				take(1)
			)
			.subscribe((data) => {
				this.updateCategoriesList(data);
				if (this.data) {
					if (this.data.selectedCategories.length) {
						this.initDialogValues(this.data.selectedCategories);
					}
				}
			});
	}

	get categories$(): Observable<any> {
		return this.categoriesSubject.asObservable();
	}

	public updateCategoriesList(categories: any[]): void {
		this.categoriesSubject.next(categories);
	}

	public save(): void {
		let placeholder: any[] = [];

		const categories: SelectCategoryModel[] = this.categoriesSubject.getValue().reduce((acc, val) => {
			val.children.forEach((item: { checked: any; value: any; text: any; }) => {
				if (item.checked) {
					acc.push({
						value: item.value,
						text: item.text,
					});

					if (placeholder.length < 2) {
						placeholder.push(item.text);
					}
				}
			});
			return acc;
		}, []);
		if (this.data.required) {
			categories.length ? this.dialogRef.close({ categories, placeholder }) : null;
		} else {
			this.dialogRef.close({ categories, placeholder });
		}
	}

	public onChangeSelectedId(categoryId: string): void {
		if (this.isMultipleMode) {
			this.updateCategoriesSource([categoryId], this.categoriesSubject.getValue());
		} else {
			this.updateCategoriesSingleMode(categoryId, this.categoriesSubject.getValue());
		}
	}

	private updateCategoriesSingleMode(id: string, categories: any[]): void {
		const necessaryCategory = this.findCategoryById(id, categories);
		if (necessaryCategory) {
			if (necessaryCategory.checked) {
				this.resetCategories();
			} else {
				for (let parent of categories) {
					parent.children = parent.children.map((child: { visible: any; value: string; checked: any; }) => {
						if (child.visible !== undefined) {
							return {
								...child,
								visible: child.value === id,
								checked: child.value === id ? !child.checked : child.checked,
							};
						}
            else return EMPTY;
					});
				}

				this.updateCategoriesList(categories);
			}
		}
	}

	private findCategoryById(id: string, categories: any[]): any {
		for (let parent of categories) {
			const necessaryChild = parent.children.find((child: { value: string; }) => child.value === id);

			if (id === parent.value) {
				return parent;
			}

			if (necessaryChild) {
				return necessaryChild;
			}
		}
	}

	private resetCategories(): void {
		const categories = this.categoriesSubject.getValue().map((parent) => {
			return {
				...parent,
				children: parent.children.map((child: { visible: any; }) => {
					if (child.visible !== undefined) {
						return { ...child, visible: true, checked: false };
					}
					return child;
				}),
			};
		});

		this.updateCategoriesList(categories);
	}

	private updateCategoriesSource(IDs: string[], categories: any[]): void {
		for (let parent of categories) {
			if (IDs.some((id) => id === parent.value)) {
				parent.checked = !parent.checked;

				parent.children = parent.children.map((child: { checked: any; }) => {
					child.checked = parent.checked;
					return child;
				});
			} else {
				parent.children = parent.children.map((child: { value: string; checked: boolean; }) => {
					if (IDs.some((id) => id === child.value)) {
						child.checked = !child.checked;
						parent.checked = parent.children.every((child: { checked: any; }) => child.checked);
					}
					return child;
				});
			}
		}
		this.updateCategoriesList(categories);
	}

	private initDialogValues(data: string[]): void {
		if (this.isMultipleMode && data) {
			this.updateCategoriesSource(data, this.categoriesSubject.getValue());
		} else if (!this.isMultipleMode && data.length) {
			this.initCategoriesSingleMode(data[0]);
		}
	}

	private initCategoriesSingleMode(category: string): void {
		this.categoriesSubject.next(
			this.categoriesSubject.getValue().map((parent) => {
				return {
					...parent,
					children: parent.children.map((child: { visible: any; value: string; }) => {
						if (child.visible !== undefined) {
							return { ...child, visible: child.value === category, checked: child.value === category };
						}
						return child;
					}),
				};
			})
		);
	}

}
