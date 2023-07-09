import { Component } from "@angular/core";

@Component({
	selector: "b2b-client-home-offers-caousel-skeleton",
	templateUrl: "./client-home-offers-caousel-skeleton.component.html",
	styleUrls: ["./client-home-offers-caousel-skeleton.component.scss"],
})
export class ClientHomeOffersCaouselSkeletonComponent {
	public readonly options: any;
	public readonly theme: any;

	constructor() {
		this.theme = this.getTheme();
		this.options = new Array(8);
	}

	public getTheme() {
		return {
			width: "380px",
			height: "171px",
		};
	}
}
