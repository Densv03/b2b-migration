import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
	selector: "b2b-ngx-pagination",
	templateUrl: "./ngx-pagination.component.html",
	styleUrls: ["./ngx-pagination.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2bNgxPaginationComponent {
	@Input() length: number;
	@Input() perPage: number;
	@Output() togglePageNumber: EventEmitter<number>;
	@Input() currentPage?: number = 1;
	// public currentPage: number;

	constructor() {
		this.togglePageNumber = new EventEmitter<number>();
		this.currentPage = 1;
		this.togglePage(1);
	}
	public get options() {
		if (!this.length || !this.perPage) {
			return [];
		}
		const count = this.length / this.perPage;
		const emptyArray = new Array(Math.ceil(count)).fill(null);
		return emptyArray.map((item, index) => ({
			label: index + 1,
			value: index + 1,
		}));
	}

	public togglePage(number: number) {
		if (number === this.currentPage) {
			return;
		}
		this.currentPage = number;
		this.togglePageNumber.emit(number);
	}

	public togglePrevPage() {
		if (this.currentPage === 1) {
			return;
		}
		this.currentPage = this.currentPage - 1;
		this.togglePageNumber.emit(this.currentPage);
	}

	public toggleNextPage() {
		if (this.currentPage === this.options.length) {
			return;
		}
		this.currentPage = this.currentPage + 1;
		this.togglePageNumber.emit(this.currentPage);
	}
}
