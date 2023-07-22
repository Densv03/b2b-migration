import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { CategoriesService } from "../../../../client/services/categories/categories.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { filter } from "rxjs/operators";
import { HotToastService } from "@ngneat/hot-toast";

@UntilDestroy()
@Component({
	selector: "b2b-admin-offer",
	templateUrl: "./admin-offer-categories.component.html",
	styleUrls: ["./admin-offer-categories.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOfferCategoriesComponent implements OnInit {
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
			.getCategories()
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

	public setLevel3Categories() {
		this.formGroup
			.get("selectLevel2Category")
			.valueChanges.pipe(
				untilDestroyed(this),
				filter((level2CategoryId) => !!level2CategoryId)
			)
			.subscribe((level2CategoryId: any) => {
				this.level3Categories = this.level2Categories.find(
					(level2Category: { _id: any; }) => level2Category._id === level2CategoryId
				)?.children;
			});
	}

	ngOnInit() {
		this.setLevel1Categories();
		this.setLevel2Categories();
		this.setLevel3Categories();
	}

	public createCategory() {
		const selectLevel1Category = this.formGroup.get("selectLevel1Category").value;
		const selectLevel2Category = this.formGroup.get("selectLevel2Category").value;

		const inputLevel1Category = this.formGroup.get("inputLevel1Category").value;
		const inputLevel2Category = this.formGroup.get("inputLevel2Category").value;
		const inputLevel3Category = this.formGroup.get("inputLevel3Category").value;

		this.errorMessage = "";

		let level1Category: any = "";
		let level2Category: any = "";
		let level3Category: any = "";

		if (inputLevel1Category && inputLevel2Category && inputLevel3Category) {
			level1Category = { name: inputLevel1Category };
			level2Category = { name: inputLevel2Category };
			level3Category = { name: inputLevel3Category };
		} else if (selectLevel1Category && inputLevel2Category && inputLevel3Category) {
			level1Category = { id: selectLevel1Category };
			level2Category = { name: inputLevel2Category };
			level3Category = { name: inputLevel3Category };
		} else if (selectLevel1Category && selectLevel2Category && inputLevel3Category) {
			level1Category = { id: selectLevel1Category };
			level2Category = { id: selectLevel2Category };
			level3Category = { name: inputLevel3Category };
		} else {
			this.errorMessage =
				"To create a category you have to fill all fields; Each level have to be filled with select (already exist category) or with name (new one); You cant select 3 level category";
			return;
		}

		this._categoriesService
			.createCategory(level1Category, level2Category, level3Category)
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
		const selectLevel3Category = this.formGroup.get("selectLevel3Category").value;

		const inputLevel1Category = this.formGroup.get("inputLevel1Category").value;
		const inputLevel2Category = this.formGroup.get("inputLevel2Category").value;
		const inputLevel3Category = this.formGroup.get("inputLevel3Category").value;

		const toggleLevel1Category = this.formGroup.get("toggleLevel1Category").value;
		const toggleLevel2Category = this.formGroup.get("toggleLevel2Category").value;
		const toggleLevel3Category = this.formGroup.get("toggleLevel3Category").value;

		this.errorMessage = "";

		let categoryIdToUpdate = "";
		let categoryNameToUpdate = "";
		let categoryHiddenToUpdate = "";

		if (selectLevel1Category && (inputLevel1Category || toggleLevel1Category)) {
			categoryIdToUpdate = selectLevel1Category;
			categoryNameToUpdate = inputLevel1Category;
			categoryHiddenToUpdate = toggleLevel1Category;
		} else if (selectLevel2Category && (inputLevel2Category || toggleLevel2Category)) {
			categoryIdToUpdate = selectLevel2Category;
			categoryNameToUpdate = inputLevel2Category;
			categoryHiddenToUpdate = toggleLevel2Category;
		} else if (selectLevel3Category && (inputLevel3Category || toggleLevel3Category)) {
			categoryIdToUpdate = selectLevel3Category;
			categoryNameToUpdate = inputLevel3Category;
			categoryHiddenToUpdate = toggleLevel3Category;
		} else {
			this.errorMessage = "To update a category you have to select it and enter a new name";
			return;
		}

		this._categoriesService
			.updateCategory(categoryIdToUpdate, categoryNameToUpdate, categoryHiddenToUpdate)
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
			selectLevel3Category: [null],
			inputLevel1Category: [null],
			inputLevel2Category: [null],
			inputLevel3Category: [null],
			toggleLevel1Category: [null],
			toggleLevel2Category: [null],
			toggleLevel3Category: [null],
		});
	}
}
