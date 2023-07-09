import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";

const SELLER_OPTIONS = [
	"Place unlimited bids for cargo sale",
	"Get legal consultation on cargo sale 24/7",
	"Get technical support 24/77",
];

const BUYER_OPTIONS = [
	"Review cargo sale offers at a discount",
	"Get access to all information disclosed by the seller, including seller’s phone number/email, and any extra photos/documents",
	"Buy your preferred cargo at a discount",
	"Place unlimited bids for cargo sale",
	"Subscribe to newsletter to receive updates on your preferred goods",
	"Get legal consultation on cargo sale 24/7",
	"Get technical support 24/7",
];

@Component({
	selector: "b2b-client-pricing",
	templateUrl: "./client-pricing.component.html",
	styleUrls: ["./client-pricing.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPricingComponent {
	public readonly sellerOptions: any[];
	public readonly buyerOptions: any[];

	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;

	constructor(public readonly b2bNgxLinkService: B2bNgxLinkService) {
		this.sellerOptions = this.tranformOptions(SELLER_OPTIONS);
		this.buyerOptions = this.tranformOptions(BUYER_OPTIONS);

		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	}

	public tranformOptions(options) {
		return options.map((option) => ({
			label: option,
			icon: "check-blue",
		}));
	}
}
