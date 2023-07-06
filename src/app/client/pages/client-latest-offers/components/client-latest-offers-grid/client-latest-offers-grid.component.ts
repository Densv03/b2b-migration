import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "libs/ngx-link/src";
import { Router } from "@angular/router";

@Component({
	selector: "b2b-client-latest-offers-grid",
	templateUrl: "./client-latest-offers-grid.component.html",
	styleUrls: ["./client-latest-offers-grid.component.scss"],
})
export class ClientLatestOffersGridComponent implements OnChanges {
	@Output() public readonly starClicked: EventEmitter<string>;

	@Input() public options: any[];
	@Input() public readonly user: any;

	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;

	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService, private readonly router: Router) {
		this.starClicked = new EventEmitter<string>();
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes && changes.options.currentValue) {
			this.options = changes.options.currentValue.map((el) => ({
				...el,
				isChatExist: !!el.chatStarted?.find((id) => id === this.user._id),
			}));
		}
	}

	public cutString(str: string, wordsToSplice: number): string {
		if (!str) return '';
		const wordsArr = str.split(' ');
		return wordsArr.length > 4 ? wordsArr.slice(0, wordsToSplice).join(' ') + '...' : str;
	}

	public openChat(event): void {
		event.stopImmediatePropagation();
	}

	public emitStarClick(id, event): void {
		event.preventDefault();
		event.stopImmediatePropagation();
		this.starClicked.emit(id);
	}

	goTo(link: string): void {
		this.router.navigate([link]);
	}
}
