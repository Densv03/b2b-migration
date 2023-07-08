import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
// import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";

@Component({
	selector: "b2b-client-latest-offers-list",
	templateUrl: "./client-latest-offers-list.component.html",
	styleUrls: ["./client-latest-offers-list.component.scss"],
})
export class ClientLatestOffersListComponent implements OnChanges {
	@Output() public starClicked: EventEmitter<string>;
	@Input() public options!: any[];
	@Input() public user: any;

	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;

	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {
		this.starClicked = new EventEmitter<string>();
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes && changes['options'].currentValue) {
			this.options = changes['options'].currentValue.map((el: any) => ({
				...el,
				isChatExist: !!el.chatStarted?.find((id: any) => id === this.user._id),
			}));
		}
	}

	emitStarClick(id: any, event: any) {
		event.preventDefault();
		event.stopImmediatePropagation();
		this.starClicked.emit(id);
	}
}
