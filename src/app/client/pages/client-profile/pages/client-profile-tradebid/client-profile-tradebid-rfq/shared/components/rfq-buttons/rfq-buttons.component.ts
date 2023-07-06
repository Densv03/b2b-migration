import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RfqButtonTypeEnum } from "../../enums/RfqButtonType.enum";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";

@Component({
	selector: "b2b-rfq-buttons",
	templateUrl: "./rfq-buttons.component.html",
	styleUrls: ["./rfq-buttons.component.scss"],
})
export class RfqButtonsComponent implements OnInit {
	@Input() rfqButtonType: RfqButtonTypeEnum;
	@Input() rfqId: any;

	@Output() delete: EventEmitter<void> = new EventEmitter<void>();
	@Output() restore: EventEmitter<void> = new EventEmitter<void>();
	@Output() edit: EventEmitter<void> = new EventEmitter<void>();
	@Output() archivate: EventEmitter<void> = new EventEmitter<void>();

	public rfqButtonTypeEnum = RfqButtonTypeEnum;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	constructor() {}

	ngOnInit(): void {}
}
