import { Component, ElementRef, OnInit } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { HotToastService } from "@ngneat/hot-toast";
import { CategoriesService} from "../../../../client/services/categories/categories.service";
import { map, Observable } from "rxjs";
import { HomepageService } from "../../../../client/shared/services/homepage/homepage.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { environment } from "../../../../../environments/environment";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@UntilDestroy()
@Component({
	selector: "b2b-admin-homepage",
	templateUrl: "./admin-homepage.component.html",
	styleUrls: ["./admin-homepage.component.scss"],
})
export class AdminHomepageComponent implements OnInit {
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public categories$: Observable<any[]> = this.getCategories$();

	public form = this.fb.group({
		categories: this.fb.array([this.createNewCategory()]),
	});

	public get categoriesFormArray(): FormArray {
		return this.form.get("categories") as FormArray;
	}

	constructor(
		private fb: FormBuilder,
		private categoriesService: CategoriesService,
		private hotToastService: HotToastService,
		private elementRef: ElementRef,
		private homepageService: HomepageService
	) {}

	public ngOnInit(): void {
		this.initCarouselCategories();
	}

	public removeCategory(index: number): void {
		if (this.categoriesFormArray.length === 1) {
			this.hotToastService.info("You have zero selected categories");
			return;
		}
		this.categoriesFormArray.removeAt(index);
	}

	public onSave(): void {
		const result = [];

		for (let i = 0; i <= 6; i++) {
			const elements = this.elementRef.nativeElement.querySelectorAll(`.url-input-${i}`);
			const categoryValue = this.categoriesFormArray.value[i]?.parentCategory;

			if (!categoryValue) {
				continue;
			}

			const products = Array.from(elements)
				.filter((item: any) => item.value && item.value.includes("b2b.discount"))
				.map((item: any) => item.value.split("/").pop());

			if (products.length > 0) {
				result.push({ id: categoryValue, products });
			}
		}

		this.homepageService
			.updateCarouselItems(result)
			.pipe(
				untilDestroyed(this),
				this.hotToastService.observe({
					loading: "Carousel updating...",
					success: "Carousel updated successfully",
					error: "Error while updating carousel",
				})
			)
			.subscribe();
	}

	public addCategory(): void {
		if (this.categoriesFormArray.length >= 6) {
			this.hotToastService.info("You can't add more then 6 categories");
			return;
		}
		this.categoriesFormArray.push(this.createNewCategory());
	}

	public getLabel(index: string | number): string {
		if (isNaN(+index)) {
			throw "Invalid index";
		}

		if (typeof index === "string") {
			return (parseInt(index) + 1).toString();
		}

		return (index + 1).toString();
	}

	public toggleCollapse(index: number): void {
		const newValue = this.categoriesFormArray.value.map((controlValue: { collapsed: any; }, i: number) =>
			index === i ? { ...controlValue, collapsed: !controlValue.collapsed } : controlValue
		);

		this.categoriesFormArray.setValue(newValue);
	}

	public onInputClick(parentIndex: string | number, childIndex: string | number): void {
		if (isNaN(+parentIndex) || isNaN(+childIndex)) {
			throw new Error("Invalid index");
		}

    let input: any;
    input = document.querySelectorAll(`.url-input-${parentIndex}`)[childIndex as any];
		input.focus();
		input.select();
	}

	private createNewCategory(): FormGroup {
		return this.fb.group({ parentCategory: [], productIds: [Array(12)], collapsed: true });
	}

	private getCategories$(): Observable<any[]> {
		return this.categoriesService.getCategories().pipe(
			map((categories) => categories.categories),
			map((categories) => categories.map(({ name, _id }: any) => {
        return ({name, _id});
      }))
		);
	}

	private initCarouselCategories(): void {
		this.homepageService.getCarouselItems().subscribe((data) => {
			for (let i = 0; i < data.length - 1; ++i) {
				this.addCategory();
			}

			this.categoriesFormArray.setValue(
				data.map((item) => ({
					parentCategory: item._id,
					productIds: Array(12),
					collapsed: true,
				}))
			);

			setTimeout(() => {
				data.forEach((item, parentIndex) => {
					document.querySelectorAll(`.url-input-${parentIndex}`).forEach((item: any, childIndex) => {
						const value = data[parentIndex].products[childIndex]?.path || data[parentIndex].products[childIndex]?._id;
						if (value) {
							item.value = environment.apiUrl.includes("api-dev")
								? "dev.b2b.discount/b2bmarket/products/" + value
								: "b2b.discount/b2bmarket/products/" + value;
						}
					});
				});
			});
		});
	}
}
