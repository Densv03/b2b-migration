import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { getName } from "country-list";
import { Observable } from "rxjs";
import { ClientMarketplaceService } from "../../client-marketplace.service";

@Component({
	selector: "b2b-client-marketplace-listing-grid",
	templateUrl: "./client-marketplace-listing-grid.component.html",
	styleUrls: ["./client-marketplace-listing-grid.component.scss"],
})
export class ClientMarketplaceListingGridComponent implements OnInit {
	@Output() public readonly starClicked: EventEmitter<string> = new EventEmitter<string>();

	@Input() marketplaceProducts: any[];
	@Input() public readonly user: any;

	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	public marketplaceSkeletonOptions: any;
	public loading$: Observable<boolean>;

	constructor(
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly clientMarketplaceService: ClientMarketplaceService
	) {
		this.marketplaceSkeletonOptions = this.clientMarketplaceService.getMarketplaceSkeletonOptions();
		this.loading$ = this.clientMarketplaceService.loading$;
	}

	ngOnInit(): void {}

	public getCountryName(countryCode: string): string {
		if (!countryCode) {
			return "";
		}
		return getName(countryCode);
	}

	public openChat(event: Event): void {
		event.stopImmediatePropagation();
	}

	public emitStarClick(id: string, event: Event): void {
		event.preventDefault();
		event.stopImmediatePropagation();
		this.starClicked.emit(id);
	}
}
