import { Component, OnInit } from "@angular/core";
import { TradebidService } from "../../tradebid.service";
import { Observable } from "rxjs";

@Component({
	selector: "b2b-rfq-list",
	templateUrl: "./rfq-list.component.html",
	styleUrls: ["./rfq-list.component.scss"],
})
export class RfqListComponent implements OnInit {
	public rfqList$: Observable<any> = this.tradeBidService.rfqList$;

	constructor(private tradeBidService: TradebidService) {}

	ngOnInit(): void {}
}
