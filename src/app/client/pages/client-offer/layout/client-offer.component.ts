import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogService } from "@ngneat/dialog";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { combineLatest, of } from "rxjs";
import { catchError, filter, map, switchMap, tap } from "rxjs/operators";

import { OffersService } from "apps/site/src/app/client/services/offers/offers.service";
import { AmplitudeService } from "apps/site/src/app/core/services/amplitude/amplitude.service";
import { getName } from "country-list";
import { B2bNgxButtonThemeEnum } from "libs/ngx-button/src";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "libs/ngx-link/src";
import { NgxTippyProps } from "ngx-tippy-wrapper";
import { environment } from "../../../../../environments/environment";
import { AuthService } from "../../../../auth/services/auth/auth.service";
import { ClientOfferContactSupplierComponent } from "../components/client-offer-contact-supplier/client-offer-contact-supplier.component";
import { ClientOfferDocumentComponent } from "../components/client-offer-document/client-offer-document.component";
import { ClientOfferImagesComponent } from "../components/client-offer-images/client-offer-images.component";
import { ClientOfferMapComponent } from "../components/client-offer-map/client-offer-map.component";
import { ClientOfferReportComponent } from "../components/client-offer-report/client-offer-report.component";
import { Offer } from "../../../../core/models/offer.model";
import { GetUrlExtension } from "../../../../core/helpers/function/get-url-extension";
import { DocumentExtensions } from "../../../../core/add-offer/document-extensions";
import { ImageExtensions } from "../../../../core/add-offer/image-extensions";
import { UserService } from "../../client-profile/services/user/user.service";
import { Meta, Title } from "@angular/platform-browser";

@UntilDestroy()
@Component({
	selector: "b2b-client-offer",
	templateUrl: "./client-offer.component.html",
	styleUrls: ["./client-offer.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientOfferComponent implements OnInit {
	public readonly imagesForCarousel: any[];
	public readonly tooltipProps: any;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;
	public readonly offerSkeletonOptions: any;
	public location: any = {};

	public offer: Offer | any;
	public error: any = true;

	public loading: boolean;
	public isAuth: string;
	public user;

	constructor(
		private readonly _activatedRouter: ActivatedRoute,
		private readonly _offersService: OffersService,
		private readonly _authService: AuthService,
		private readonly _changeDetectorRef: ChangeDetectorRef,
		private readonly _dialogService: DialogService,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly _ampService: AmplitudeService,
		private readonly _router: Router,
		private readonly userService: UserService,
		private readonly title: Title,
		private readonly meta: Meta
	) {
		this.isAuth = localStorage.getItem("token");
		this.offer = null;
		this.tooltipProps = this.getTooltipProps();
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
		this.offerSkeletonOptions = this.getOfferSkeletonOptions();
		this.user = this.userService.getUser();
	}

	ngOnInit() {
		this.setOffer();
	}

	public getCurrentLocation(code: string): string {
		if (!code) {
			return "";
		}
		if (code?.length > 2) {
			return code;
		}
		return getName(code);
	}

	logOfferEvent(category: any) {
		const watchedOffers = localStorage.getItem("watchedOffers");
		localStorage.setItem("watchedOffers", watchedOffers ? (+watchedOffers + 1).toString() : "1");
		this._ampService.logEvent("View offer", {
			num: +watchedOffers + 1,
			category: category?.name || "",
			source: localStorage.getItem("source"),
		});
	}

	processContactSupplierClick(offer: any) {
		// this._ampService.logEvent("Click contact supplier", {
		// 	type: this.offer.category?.name,
		// 	source: localStorage.getItem("source"),
		// });

		if (offer.reasonForDeletion) {
			return null;
		}

		if (offer.isMine) {
			return this._router.navigateByUrl("/offers/" + offer._id + "/");
		}

		this._authService
			.getUser()
			.pipe(untilDestroyed(this))
			.subscribe((user) => {
				if (!user) {
					return this._router.navigateByUrl("/auth/log-in");
				}
				return this._router.navigateByUrl("/offers/" + offer._id + "/chat");
			});
	}

	public getOfferSkeletonOptions() {
		return [
			{
				count: 20,
				animation: "progress",
			},
		];
	}

	public getTooltipProps(): NgxTippyProps {
		return {
			arrow: false,
			content: `If you’re having or previously had any issues related to this
			offer or seller, please, tell us about it in order to protect other buyers`,
			placement: "bottom",
			theme: "light",
		};
	}

	public openDocument(document) {
		this._dialogService.open(ClientOfferDocumentComponent, {
			data: document,
			width: "80vw",
			height: "80vh",
		});
	}

	public openImages() {
		this._dialogService.open(ClientOfferImagesComponent, {
			data: {
				...this.offer,
			},
			width: "80vw",
			height: "80vh",
		});
	}

	public openMap() {
		this._dialogService.open(ClientOfferMapComponent, {
			data: {
				...(this.location || {}),
				...this.offer,
			},
			width: "80vw",
			height: "80vh",
		});
	}

	public openReportPopover() {
		this._dialogService.open(ClientOfferReportComponent, {
			data: {
				...this.offer,
			},
			width: "40vw",
			height: "auto",
			minHeight: "0",
			windowClass: "report-dialog",
		});
	}

	public setOffer() {
		this.loading = true;

		const offer$ = this._activatedRouter.params.pipe(
			untilDestroyed(this),
			switchMap((params) => this._offersService.getOfferById(params.id)),
			catchError((err) => {
				this.error = err.error.code;
				this.loading = false;
				this._changeDetectorRef.detectChanges();
				return of(null);
			}),
			filter((offer) => !!offer),
			map((offer) => ({
				...offer,
				documents: Array.isArray(offer.documents)
					? offer.documents.map((document) => ({
							...document,
							fullPath: environment.apiUrl + document.path,
							extension: GetUrlExtension(document.path),
							isImage: ImageExtensions.includes(GetUrlExtension(document.path)),
							isDocument: DocumentExtensions.includes(GetUrlExtension(document.path)),
					  }))
					: offer.documents,
			})),
			tap(() => {
				this.loading = false;
				this._changeDetectorRef.detectChanges();
			})
		);
		const user$ = this._authService
			.getUser()
			.pipe
			// filter((user) => !!user)
			();

		combineLatest([offer$, user$])
			.pipe(untilDestroyed(this))
			.subscribe(([offer, user]) => {
				this.addSeoTags(offer);
				this.offer = {
					...offer,
					isMine: offer.user === (user ? user._id : null),
					destination: {
						...offer.destination,
						from: getName(offer.destination.from),
						to: getName(offer.destination.to),
					},
				};
				this.logOfferEvent(this.offer.category);

				const seaLine = `container=${offer?.container}&seaLine=${offer.seaLine}&type=${offer.transportType?.name}`;
				const bulkVessel = `container=${offer?.container}&type=${offer.transportType?.name}&containerNumberType=${offer?.containerNumberType}`;

				const query = offer.transportType.name === "bulk_vessel" ? bulkVessel : seaLine;
				this._offersService
					.getContainerLocation(query)
					.pipe(untilDestroyed(this))
					.subscribe((res: any = {}) => {
						this.location = res;
						this._changeDetectorRef.detectChanges();
					});

				this._changeDetectorRef.detectChanges();
			});
	}

	private addSeoTags(product: any): void {
		this.title.setTitle(`Buy ${product.title.trim()} with B2B Discount`);
		this.meta.updateTag({
			name: "description",
			content: `${product.title.trim()} Wholesale with B2B Discount at the best prices! Discover more great deals on the B2B Discount website`,
		});
	}
}
