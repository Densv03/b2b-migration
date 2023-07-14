import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "b2b-categories-modal-list",
	templateUrl: "./categories-modal-list.component.html",
	styleUrls: ["./categories-modal-list.component.scss"],
})
export class CategoriesModalListComponent {
	@Input() categoriesList: Array<any>;
	@Input() isParentCategoryChecked: boolean = false;
	@Input() isMultipleMode: boolean = false;

	@Output() selectedId: EventEmitter<string> = new EventEmitter<string>();

	constructor() {}

	public selectFullCategory(e: Event | boolean): void {
		if (typeof e !== 'boolean') {
      e.stopPropagation();
    }
		this.selectedId.emit(this.categoriesList[0].parentId);
	}

	public selectCategory($event: Event, categoryId: string): void {
		$event.stopPropagation();
		this.selectedId.emit(categoryId);
	}
}
