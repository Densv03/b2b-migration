import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { CategoriesService } from "../../../../client/services/categories/categories.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter } from "rxjs/operators";
import { HotToastService } from "@ngneat/hot-toast";
import {FormBuilder, FormGroup} from "@angular/forms";

@UntilDestroy()
@Component({
	selector: "b2b-admin-article",
	templateUrl: "./admin-article-categories.component.html",
	styleUrls: ["./admin-article-categories.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminArticleCategoriesComponent implements OnInit {
	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	public readonly formGroup: FormGroup;

	public level1Categories: any;
	public level2Categories: any;
	public level3Categories: any;

	public errorMessage: string;

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _categoriesService: CategoriesService,
		private readonly _hotToastrService: HotToastService
	) {
		this.b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

		this.formGroup = this.getFormGroup();

		this.level1Categories = [];
		this.level2Categories = [];
		this.level3Categories = [];

		this.errorMessage = "";
	}

	public setLevel1Categories() {
		this._categoriesService
			.getWikiCategories()
			.pipe(untilDestroyed(this))
			.subscribe((categories) => {
				this.level1Categories = categories;
			});
	}

	public setLevel2Categories() {
		this.formGroup
			.get("selectLevel1Category")
			.valueChanges.pipe(
				untilDestroyed(this),
				filter((level1CategoryId) => !!level1CategoryId)
			)
			.subscribe((level1CategoryId: any) => {
				this.level2Categories = this.level1Categories.find(
					(level1Category: { _id: any; }) => level1Category._id === level1CategoryId
				)?.children;
			});
	}

	ngOnInit() {
		this.setLevel1Categories();
		this.setLevel2Categories();
	}

	public createCategory() {
		const selectLevel1Category = this.formGroup.get("selectLevel1Category").value;

		const inputLevel1Category = this.formGroup.get("inputLevel1Category").value;
		const inputLevel2Category = this.formGroup.get("inputLevel2Category").value;

		this.errorMessage = "";

		let level1Category: any = "";
		let level2Category: any = "";

		if (inputLevel1Category && inputLevel2Category) {
			level1Category = { name: inputLevel1Category };
			level2Category = { name: inputLevel2Category };
		} else if (selectLevel1Category && inputLevel2Category) {
			level1Category = { id: selectLevel1Category };
			level2Category = { name: inputLevel2Category };
		} else {
			this.errorMessage =
				"To create a category you have to fill all fields; Each level have to be filled with select (already exist category) or with name (new one); You cant select 2 level category";
			return;
		}

		this._categoriesService
			.createWikiCategory(level1Category, level2Category)
			.pipe(
				untilDestroyed(this),
				this._hotToastrService.observe({
					loading: "Category is creating...",
					success: "Category successfully created",
					error: "Categories creating failed",
				})
			)
			.subscribe();
	}

	public updateCategory() {
		const selectLevel1Category = this.formGroup.get("selectLevel1Category").value;
		const selectLevel2Category = this.formGroup.get("selectLevel2Category").value;

		const inputLevel1Category = this.formGroup.get("inputLevel1Category").value;
		const inputLevel2Category = this.formGroup.get("inputLevel2Category").value;

		const toggleLevel1Category = this.formGroup.get("toggleLevel1Category").value;
		const toggleLevel2Category = this.formGroup.get("toggleLevel2Category").value;

		this.errorMessage = "";

		let categoryIdToUpdate = "";
		let categoryNameToUpdate = "";
		let categoryHiddenToUpdate = "";

		if (selectLevel1Category && (inputLevel1Category || typeof toggleLevel1Category == "boolean")) {
			categoryIdToUpdate = selectLevel1Category;
			categoryNameToUpdate = inputLevel1Category;
			categoryHiddenToUpdate = toggleLevel1Category;
		} else if (selectLevel2Category && (inputLevel2Category || typeof toggleLevel2Category == "boolean")) {
			categoryIdToUpdate = selectLevel2Category;
			categoryNameToUpdate = inputLevel2Category;
			categoryHiddenToUpdate = toggleLevel2Category;
		} else {
			this.errorMessage = "To update a category you have to select it and enter a new name";
			return;
		}

		this._categoriesService
			.updateWikiCategory(categoryIdToUpdate, categoryNameToUpdate, categoryHiddenToUpdate)
			.pipe(
				untilDestroyed(this),
				this._hotToastrService.observe({
					loading: "Category is updating...",
					success: "Category successfully updated",
					error: "Categories updating failed",
				})
			)
			.subscribe();
	}

	public getFormGroup() {
		return this._formBuilder.group({
			selectLevel1Category: [null],
			selectLevel2Category: [null],
			inputLevel1Category: [null],
			inputLevel2Category: [null],
			toggleLevel1Category: [true],
			toggleLevel2Category: [true],
		});
	}
}
