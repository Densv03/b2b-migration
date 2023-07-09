import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	forwardRef, HostListener,
	Input,
	OnInit,
	ViewChild
} from "@angular/core";
import {CategoriesService} from "../../../../../src/app/client/services/categories/categories.service";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {map} from "rxjs/operators";
// import {TreeviewConfig} from "ngx-treeview";
// import {FormBuilder, FormGroup} from "@ngneat/reactive-forms";
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
	selector: "b2b-ngx-category-dropdowns",
	templateUrl: "./ngx-category-dropdowns.component.html",
	styleUrls: ["./ngx-category-dropdowns.component.scss"],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NgxCategoryDropdownsComponent),
			multi: true,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxCategoryDropdownsComponent implements OnInit, ControlValueAccessor {
	@ViewChild('panelBlock') panelBlock!: ElementRef;
	@ViewChild('subcategory') subcategory!: ElementRef;

	@Input() parentCategoryLabel: string = "Choose your company's product range";
	@Input() parentCategoryPlaceholder: string = "Select product range";
	@Input() childCategoryLabel: string = "Select subcategory";
	@Input() childCategoryPlaceholder: string = "Select subcategory";
	public categories$: Observable<any> = this.getCategories$();
	// public config: TreeviewConfig = TreeviewConfig.create({
	// 	hasAllCheckBox: false,
	// 	hasFilter: false,
	// 	hasCollapseExpand: false,
	// 	decoupleChildFromParent: false,
	// 	maxHeight: 400,
	// });
	public selectedSubcategories: string[] = [];
	public form: FormGroup = this.fb.group({
		categoryLevel1: [null],
		categoryLevel2: [null],
	});

	public panelWidth!: string;
	public isDropdownVisible = false;
	private categoriesLevel2Source: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	private categoriesList: any[] = [];

	constructor(private readonly categoriesService: CategoriesService,
							private readonly fb: FormBuilder,
							private readonly cdr: ChangeDetectorRef) {
	}


	@HostListener('document:click', ['$event'])
	private onGlobalClick(event: PointerEvent): void {
		if (!this.subcategory.nativeElement.contains(event.target) && this.isDropdownVisible) {
			this.toggleDropdown();
		}
	}

	writeValue(categories: string | string[]): void {
		this.categoriesService.getCategories().subscribe((data: any) => {
			if (typeof categories === "string") {
				this.patchValueToForm(data.categories, [categories]);
			} else if (Array.isArray(categories)) {
				this.patchValueToForm(data.categories, categories);
			} else {
				console.error("Invalid data type for patch value");
				return;
			}
		});
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	onChange = (value: any) => {
	};
	onTouched = () => {
	};

	ngOnInit(): void {
		this.updateLevel2CategoriesSource();
	}

	public get categoriesLevel2$(): Observable<any[]> {
		return this.categoriesLevel2Source.asObservable();
	}

	public onSelectAll(id: string, newValue?: boolean): void {
		const foundCategoryId = this.categoriesLevel2Source.getValue().findIndex((category) => category._id === id);
		if (foundCategoryId === -1) {
			return;
		}
		const foundCategory = this.categoriesLevel2Source.getValue()[foundCategoryId];
		foundCategory.selectAll = newValue || !foundCategory.selectAll;
		foundCategory.children.forEach((childCategory: any) => (childCategory.checked = foundCategory.selectAll));

		const resultArray = [...this.categoriesLevel2Source.getValue()];
		resultArray[foundCategoryId] = foundCategory;
		this.categoriesLevel2Source.next(resultArray);
		this.updateFormControlValue();
	}

	public onSelectCheckbox(
		{
			parentCategoryId,
			childCategoryId,
		}: {
			parentCategoryId: string;
			childCategoryId: string;
		},
		newValue?: boolean
	): void {
		const arrCopy = [...this.categoriesLevel2Source.getValue()];
		const foundCategory = arrCopy.find((category: any) => category._id === parentCategoryId);

		if (!foundCategory?.children) return;

		foundCategory.children = foundCategory.children.map((childCategory: any) => {
			if (childCategory._id === childCategoryId) {

				return {...childCategory, checked: newValue || !childCategory.checked};
			}

			return childCategory;
		});

		foundCategory.selectAll = foundCategory.children.every((childCategory: any) => childCategory.checked);
		this.categoriesLevel2Source.next([...arrCopy]);

		this.updateFormControlValue();
	}

	public toggleDropdown(): void {
		if (this.categoriesLevel2Source.value.length !== 0) {
			this.isDropdownVisible = !this.isDropdownVisible;
			this.cdr.detectChanges();
		}

		if (this.isDropdownVisible) {
			this.panelWidth = `${this.panelBlock.nativeElement.offsetWidth}px`
		}
	}

	private getCategories$(): Observable<any> {
		return this.categoriesService.getCategories().pipe(
			map((data: any) => data.categories),
			tap((categories: any[]) => (this.categoriesList = categories)),
			map((categories: any[]) =>
				categories.map((category: any) => ({
					text: category.name,
					value: category._id,
					collapsed: false,
					checked: false,
				}))
			)
		);
	}

	private updateLevel2CategoriesSource(): void {
		this.form.get("categoryLevel1")?.valueChanges.subscribe((parentCategoriesArr: string[]) => {
			const categoriesSourceIds = this.categoriesLevel2Source.getValue().map((category) => category._id);

			if (parentCategoriesArr?.length < this.categoriesLevel2Source.getValue().length) {
				const removedCategoryId = categoriesSourceIds.find((categoryId) => !parentCategoriesArr.includes(categoryId));
				const removedCategoryIndex = this.categoriesLevel2Source
					.getValue()
					.findIndex((category) => category._id === removedCategoryId);

				if (!removedCategoryId) {
					console.error("Not found category ID which was removed");
				} else if (removedCategoryIndex === -1) {
					console.error("Not found category by specific id");
				}

				const newArray = this.categoriesLevel2Source
					.getValue()
					.filter((category) => category._id !== removedCategoryId);
				this.categoriesLevel2Source.next(newArray);
				this.updateFormControlValue();
			} else if (parentCategoriesArr?.length > this.categoriesLevel2Source.getValue().length) {
				const addedCategoryId = parentCategoriesArr.find((categoryId) => !categoriesSourceIds.includes(categoryId));
				const addedCategory = this.categoriesList.find((parentCategory) => parentCategory._id === addedCategoryId);

				if (!addedCategoryId) {
					console.error("Not found category ID which was added");
					return;
				} else if (!addedCategory) {
					console.error("Not found category by specific id");
					return;
				}

				this.categoriesLevel2Source.next([
					...this.categoriesLevel2Source.getValue(),
					this.addCheckedFieldToObject(addedCategory),
				]);
			}
		});
	}

	private updateFormControlValue(): void {
		const resultArray: any[] = [];
		this.categoriesLevel2Source.getValue().forEach((val: any) => {
			val.children.forEach((childCategory: any) => {
				if (childCategory.checked) {
					resultArray.push({id: childCategory._id, name: childCategory.name});
				}
			});
		});

		const result = [...this.categoriesLevel2Source.value.map(el => el._id), ...resultArray.map(el => el.id)];
		this.selectedSubcategories = resultArray.map(el => el.name);
		this.onChange(result);
	}

	private addCheckedFieldToObject(obj: any): any {
		const children = obj.children.map((childCategory: any) => ({...childCategory, checked: false}));
		return {...obj, children, selectAll: false};
	}

	private patchValueToForm(categoriesList: any[], categoriesIds: string[]): void {
		this.setValuesToParentCategoriesDropdown(categoriesList, categoriesIds);
		this.setValuesToChildrenCategoriesDropdown(categoriesList, categoriesIds);
	}

	private getParentCategoryId(categoriesList: any[], categoryId: string): string {
		let parentCategoryId = "";
		categoriesList.forEach((category) => {
			if (
				category._id === categoryId ||
				category.children.some((childCategory: any) => childCategory._id === categoryId)
			) {
				parentCategoryId = category._id;
			}
		});
		return parentCategoryId;
	}

	private setValuesToParentCategoriesDropdown(categoriesList: any[], categoriesIds: string[]): void {
		const parentCategoriesArr: string[] = [];
		categoriesIds.forEach((categoryId) => {
			if (
				!parentCategoriesArr.includes(this.getParentCategoryId(categoriesList, categoryId)) &&
				this.getParentCategoryId(categoriesList, categoryId)
			) {
				parentCategoriesArr.push(this.getParentCategoryId(categoriesList, categoryId));
			}
		});

		this.form.get("categoryLevel1")?.setValue(parentCategoriesArr);
	}

	private setValuesToChildrenCategoriesDropdown(categoriesList: any[], categoriesIds: string[]): void {
		categoriesIds.forEach((categoryId) => {
			if (this.isParentCategory(categoriesList, categoryId)) {
				this.onSelectAll(categoryId, true);
			} else {
				const parentCategoryId = this.getParentCategoryId(categoriesList, categoryId);
				this.onSelectCheckbox({parentCategoryId, childCategoryId: categoryId}, true);
			}
		});
	}

	private isParentCategory(categoriesList: any[], categoryId: string): boolean {
		return !!categoriesList.find((parentCategory) => parentCategory._id === categoryId);
	}
}
