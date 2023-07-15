import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {ClientMarketplaceService} from "../../client-marketplace.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TradebidService} from "../../../client-tradebid/tradebid.service";
import {BehaviorSubject, combineLatest, exhaustMap, mergeMap, Observable, Subject} from "rxjs";
// @ts-ignore
import {getName} from "country-list";
import {
	ClientOfferReportComponent
} from "../../../client-offer/components/client-offer-report/client-offer-report.component";
import {
	ClientOfferImagesComponent
} from "../../../client-offer/components/client-offer-images/client-offer-images.component";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {B2bNgxLinkService} from "@b2b/ngx-link";
import {UserService} from "../../../client-profile/services/user/user.service";
import {io} from "socket.io-client";
import {environment} from "../../../../../../environments/environment";
import {User} from "../../../../../core/models/user/user.model";
import {first, map, skip, takeUntil} from "rxjs/operators";
import {AuthService} from "../../../../../auth/services/auth/auth.service";
import {MarketProductModel} from "../../models/market-product.model";
import {Meta, Title} from "@angular/platform-browser";
import {PublicCompanyInfoModel} from "../../../../../core/models/public-company-info.model";
import {Dialog} from "@angular/cdk/dialog";

@Component({
	selector: "b2b-client-marketplace-product-details",
	templateUrl: "./client-marketplace-product-details.component.html",
	styleUrls: ["./client-marketplace-product-details.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientMarketplaceProductDetailsComponent implements OnInit, OnDestroy {
	public productSource: BehaviorSubject<MarketProductModel> = new BehaviorSubject<MarketProductModel>(null);
	public user: User;
	public token: string;
	public otherProducts: MarketProductModel[];
	public companyName: string;
	public isAuth: boolean = false;
	public b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public companyId: string;

	public companyInfo: PublicCompanyInfoModel;
	private productId: string;
	private socket: any;
	private componentIsDestroyed: Subject<void> = new Subject();
	public isAuth$: Observable<boolean>;

	constructor(
		private readonly marketService: ClientMarketplaceService,
		private readonly changeDetectionRef: ChangeDetectorRef,
		private readonly tradebidService: TradebidService,
		private readonly userService: UserService,
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly authService: AuthService,
		private readonly title: Title,
		private readonly meta: Meta,
    private readonly dialog: Dialog
	) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.user = this.userService.getUser();
		this.isAuth$ = this.authService.user$.pipe(
			map(user => !!user)
		)
	}

	ngOnInit(): void {
		this.activatedRoute.params
			.pipe(
				skip(1),
				takeUntil(this.componentIsDestroyed),
				exhaustMap(({id}) => {
					this.productId = id;
					return this.marketService.getProductById(id);
				})
			).subscribe(({product, otherProducts, company}) => {
			this.productSource.next(product);
			this.otherProducts = otherProducts;
			this.companyId = company._id;
			this.addSeoTags(product)
			this.companyInfo = company;
		});

		this.marketService
			.getProductById(this.activatedRoute.snapshot.params['id'])
			.pipe(
				first(),
				mergeMap(({product, otherProducts, company})=> {
					this.productSource.next(product);
					this.otherProducts = otherProducts;
					this.companyId = company._id;
					this.addSeoTags(product);
					this.companyInfo = company;
					return this.userService.getPublicUserInfo(product.user);
				})
			).subscribe(({companyName}) => {
				this.companyName = companyName;
			});

		this.userService.getToken$().subscribe((token) => {
			this.token = token;
		});

	}

	public getCountryName(countryCode: string): string {
		if (!countryCode) {
			return "";
		}
		return getName(countryCode);
	}

	public navigateOnProductDetail(productId: string): void {
		this.router.navigate([`/b2bmarket/products`, productId]);
	}

	public openReportPopover() {
		this.dialog.open(ClientOfferReportComponent, {
			data: {
				...this.productSource,
			},
			width: "40vw",
			height: "auto",
      minHeight: "0",
      panelClass: "report-dialog",
		});
	}

	public openImages() {
		this.dialog.open(ClientOfferImagesComponent, {
			data: {
				...this.productSource,
			},
			width: "80vw",
			height: "80vh",
		});
	}

	public goTo(link: string) {
		this.router.navigate([link]);
	}

	public openChat(event: MouseEvent): void {
		event.stopPropagation();

		const {user, _id} = this.productSource.getValue();

		if (!this.userService.isAuth()) {
			this.router.navigate(["/auth/register-credentials"]);
		} else {
			if (user === this.user._id) {
				this.goTo("/b2bmarket/products/" + _id);
				return;
			}

			this.openConnection(this.token);
			this.socket.emit("start_chat", {
				userId: user,
				productId: _id,
				typeRoom: "product",
			});

			this.socket.on("chat_info", (data: any) => {
				this.goTo("profile/your-workspace/b2bmarket/chat/" + data._id);
			});
		}
	}



	private openConnection(token: string): void {
		if (this.socket) {
			this.socket.disconnect();
		}

		this.socket = io(environment.apiUrl, {
			path: "/chat",
			auth: {
				token,
			},
		});
	}

	private addSeoTags(product: any): void {
		this.title.setTitle(`Buy ${product.title.trim()} with B2B Discount`);
		this.meta.updateTag({
			name: 'description',
			content: `${product.title.trim()} Wholesale with B2B Discount at the best prices! Discover more great deals on the B2B Discount website`
		});
	}

	ngOnDestroy(): void {
		this.componentIsDestroyed.next();
	}
}
