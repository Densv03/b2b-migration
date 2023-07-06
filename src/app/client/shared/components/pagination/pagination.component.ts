import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'b2b-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

	@Input() length!: number;
	@Input() perPage!: number;
	@Output() togglePageNumber: EventEmitter<number>;
	@Input() currentPage: number = 1;

	private deviceIsMobile: boolean;

	constructor() {
		this.togglePageNumber = new EventEmitter<number>();
		this.currentPage = 1;
		this.togglePage(1);

		this.deviceIsMobile = window.innerWidth < 576
	}

	public get options() {
		if (!this.length || !this.perPage) {
			return [];
		}
		const count = Math.ceil(this.length / this.perPage);
		let emptyArray = [];
		if (count <= 9) {
			emptyArray = new Array(Math.ceil(count)).fill(null);
			return emptyArray.map((item, index) => ({
				label: (index + 1).toString(),
				value: index + 1,
			}));
		} else {
			emptyArray = this.fillEmptyArray(Number(this.currentPage), count);
			return emptyArray;
		}
	}

	public togglePage(number: number): void {
		if (number === this.currentPage) {
			return;
		}
		this.currentPage = number;
		this.togglePageNumber.emit(number);
	}

	public togglePrevPage() {
		if (this.currentPage == 1) {
			return;
		}
		this.currentPage = this.currentPage - 1;
		this.togglePageNumber.emit(this.currentPage);
	}

	public toggleNextPage() {
		if (this.currentPage == Math.ceil(this.length / this.perPage)) {
			return;
		}
		this.currentPage = this.currentPage + 1;
		this.togglePageNumber.emit(this.currentPage);
	}

	private fillEmptyArray(
		currentPage: number,
		totalPaginationLength: number
	): any[] {
		let arr = [];
		if (isNaN(+currentPage)) {
			return;
		}
		if (+currentPage - 2 <= 1) {
			for (let i = 1; i <= +currentPage + 2; ++i) {
				arr.push({label: i, value: i});
			}
			arr.push(
				{label: '...', value: currentPage + 3},
				{label: totalPaginationLength, value: totalPaginationLength}
			)
		} else {
			if (this.deviceIsMobile) {
				arr.push(
					{label: '1', value: 1},
					{label: '...', value: currentPage - 3},
					{label: currentPage - 1, value: currentPage - 1},
					{label: currentPage, value: currentPage},
					{label: currentPage + 1, value: currentPage + 1},
					{label: '...', value: currentPage + 3},
					{label: totalPaginationLength, value: totalPaginationLength}
				);
			} else {
				arr.push(
					{label: '1', value: 1},
					{label: '...', value: currentPage - 3},
					{label: currentPage - 2, value: currentPage - 2},
					{label: currentPage - 1, value: currentPage - 1},
					{label: currentPage, value: currentPage},
					{label: currentPage + 1, value: currentPage + 1},
					{label: currentPage + 2, value: currentPage + 2},
					{label: '...', value: currentPage + 3},
					{label: totalPaginationLength, value: totalPaginationLength}
				);
			}
		}

		const paginatorLength = Math.ceil(this.length / this.perPage);

		if (currentPage > paginatorLength - 4) {
			arr = [];
			arr.push(
				{label: '1', value: 1},
				{label: '...', value: currentPage - 3})
			for (let i = paginatorLength - 4; i <= paginatorLength; i++) {
				arr.push({label: i, value: i})
			}
		}

		return arr;
	}

}
