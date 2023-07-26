import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Category } from "../../../shared/models/category.model";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
	selector: "b2b-category-item",
	templateUrl: "./category-item.component.html",
	styleUrls: ["./category-item.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("fadeAnimation", [
      transition(":enter", [style({ height: 0, opacity: 0 }), animate("300ms", style({ height: 20, opacity: 1 }))]),
      transition(":leave", [style({ height: 1, opacity: 1 }), animate("300ms", style({ height: 0, opacity: 0 }))]),
    ]),
  ],
})
export class CategoryItemComponent implements OnInit {
	@Input() category: Category;
	@Output() categoryItemClicked: EventEmitter<Category> = new EventEmitter<Category>();

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
