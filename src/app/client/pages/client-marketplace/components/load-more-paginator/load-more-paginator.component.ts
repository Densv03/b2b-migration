import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
	selector: "b2b-load-more-paginator",
	templateUrl: "./load-more-paginator.component.html",
	styleUrls: ["./load-more-paginator.component.scss"],
})
export class LoadMorePaginatorComponent implements OnInit {
	@Output() loadMoreClicked: EventEmitter<number> = new EventEmitter<number>();

	private loadMoreClickedCounter: number = 0;

	constructor() {}

	ngOnInit(): void {}

	public onPaginatorClicked(): void {
		this.loadMoreClickedCounter += 1;
		this.loadMoreClicked.emit(this.loadMoreClickedCounter);
	}
}
