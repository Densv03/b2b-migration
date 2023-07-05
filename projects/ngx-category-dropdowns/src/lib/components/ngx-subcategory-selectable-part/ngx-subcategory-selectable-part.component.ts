import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
	selector: 'b2b-ngx-subcategory-selectable-part',
	templateUrl: './ngx-subcategory-selectable-part.component.html',
	styleUrls: ['./ngx-subcategory-selectable-part.component.scss']
})
export class NgxSubcategorySelectablePartComponent {

	@Input() category: any;
	@Output() private selectSubcategory: EventEmitter<{
		parentCategoryId: string,
		childCategoryId: string
	}> = new EventEmitter<{ parentCategoryId: string, childCategoryId: string }>();
	@Output() private selectAll: EventEmitter<string> = new EventEmitter<string>();

	constructor() {
	}

	public updateCheckbox(e: Event, childCategoryId: string, parentCategoryId: string): void {
		e.stopPropagation();
		this.selectSubcategory.emit({childCategoryId, parentCategoryId});
	}

	public updateToggle(e: Event, id: string): void {
		e.preventDefault();
		this.selectAll.emit(id);
	}
}
