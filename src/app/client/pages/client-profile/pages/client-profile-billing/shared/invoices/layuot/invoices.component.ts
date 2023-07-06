import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "b2b-invoices",
	templateUrl: "./invoices.component.html",
	styleUrls: ["./invoices.component.scss"],
})
export class InvoicesComponent implements OnInit {
	@Input() invoices: any;
	constructor() {}

	ngOnInit(): void {}
}
