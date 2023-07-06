import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {B2bNgxLinkService, B2bNgxLinkThemeEnum} from "@b2b/ngx-link";
import {getName} from "country-list";
import {ClientMarketplaceService} from "../../client-marketplace.service";
import {Observable} from "rxjs";

@Component({
	selector: "b2b-client-marketplace-listing-list",
	templateUrl: "./client-marketplace-listing-list.component.html",
	styleUrls: ["./client-marketplace-listing-list.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientMarketplaceListingListComponent {
	@Output() public readonly starClicked: EventEmitter<string> = new EventEmitter<string>();

	@Input() marketplaceProducts: any[];
	@Input() user: any;

	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;

	public loading$: Observable<boolean>;
	public marketplaceSkeletonSettings: any;

	constructor(
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly clientMarketplaceService: ClientMarketplaceService
	) {
		this.loading$ = this.clientMarketplaceService.loading$;
		this.marketplaceSkeletonSettings = this.clientMarketplaceService.getMarketplaceSkeletonOptions();
	}

	public cutString(name: string, wordsToSlice: number = 2): string {
		if	(!name) return '';
		const splittedName = name.split(' ');
		if	(splittedName.length > 2) {
			return splittedName.slice(0, wordsToSlice).join(' ')
		} return name
	}

	public emitStarClick(id, event): void {
		event.preventDefault();
		event.stopImmediatePropagation();
		this.starClicked.emit(id);
	}

	public getCountryName(countryCode: string): string {
		if (!countryCode) {
			return "";
		}
		return getName(countryCode);
	}
}
