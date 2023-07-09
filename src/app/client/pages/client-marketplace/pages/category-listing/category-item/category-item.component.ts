import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Category } from "../../../shared/models/category.model";

@Component({
	selector: "b2b-category-item",
	templateUrl: "./category-item.component.html",
	styleUrls: ["./category-item.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryItemComponent implements OnInit {
	@Input() category: Category;
	@Output() categoryItemClicked: EventEmitter<string> = new EventEmitter<string>();

	private childrenCategoriesSource: BehaviorSubject<Category> = new BehaviorSubject<Category>(null);

	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.detectChildrenCategories(this.category);
	}

	get childrenCategoryObject$(): Observable<Category> {
		return this.childrenCategoriesSource.asObservable();
	}

	public showCardCategories(category: Category) {
		const childrenCategoriesObj: Category = {
			...category,
			isSelected: true,
			children: this.category.children,
		};
		this.childrenCategoriesSource.next(childrenCategoriesObj);
	}

	public hideCardCategories(category: Category) {
		const childrenCategoriesObj: Category = {
			...category,
			isSelected: false,
			children: this.childrenCategoriesSource.getValue().children.slice(0, 5),
		};
		this.childrenCategoriesSource.next(childrenCategoriesObj);
	}

	private detectChildrenCategories(category: Category): void {
		const obj: Category = {
			...category,
			isSelected: false,
			children: category.children.slice(0, 5),
		};
		this.childrenCategoriesSource.next(obj);
	}
}
