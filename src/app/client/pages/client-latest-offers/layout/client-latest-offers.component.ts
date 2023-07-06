import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import { OffersService } from "apps/site/src/app/client/services/offers/offers.service";
import { B2bNgxInputThemeEnum } from "libs/ngx-input/src";
import { B2bNgxButtonThemeEnum } from "libs/ngx-button/src";
import { B2bNgxSelectThemeEnum } from "libs/ngx-select/src/lib/enums/ngx-select-theme.enum";
import { CategoriesService } from "apps/site/src/app/client/services/categories/categories.service";
import { TransportTypesService } from "apps/site/src/app/client/services/transport-types/transport-types.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, startWith, switchMap, tap } from "rxjs/operators";
import { AuthService } from "apps/site/src/app/auth/services/auth/auth.service";
import { HotToastService } from "@ngneat/hot-toast";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { TranslocoService } from "@ngneat/transloco";
import { AmplitudeService } from "apps/site/src/app/core/services/amplitude/amplitude.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ShowMoreModeEnum} from "../enums/show-more-mode.enum";
import {BrowserStorageKeysEnum} from "../../../../shared/enums/browser-storage-keys.enum";
import {ActivatedRoute, Router} from "@angular/router";

function toFlat(arr: any[]) {
	return arr.reduce((pre, { children = [], ...cur }) => [...pre, ...toFlat(children), cur], []);
}

function generateQueryString(obj) {
	return Object.entries(obj)
		.filter(([key, value]: any) => !!value)
		.reduce((queryString: string, [key, value]: any) => {
			return Array.isArray(value)
				? `${queryString}${value.reduce((str, arrayItem, index) => `${str}${key}=${arrayItem}&`, "")}`
				: `${queryString}${key}=${value}&`;
		}, "?");
}

@UntilDestroy()
@Component({
	selector: "b2b-client-latest-offers",
	templateUrl: "./client-latest-offers.component.html",
	styleUrls: ["./client-latest-offers.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('slideInOut', [
			state('in', style({
				overflow: 'hidden',
				height: '*',
			})),
			state('out', style({
				opacity: '0',
				overflow: 'hidden',
				height: '0px',
				marginTop: '0px'
			})),
			transition('in => out', animate('400ms ease-in-out')),
			transition('out => in', animate('400ms ease-in-out'))
		])
	]
})
export class ClientLatestOffersComponent implements OnInit {
	public readonly offers$: Observable<any>;
	public readonly offersSkeletonOptions: any[];
	public readonly offersCount$: Observable<number>;

	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxSelectThemeEnum: typeof B2bNgxSelectThemeEnum;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;

	public offersListTheme: "list" | "grid";
	public showMoreMode: "in" | "out";
	public showMoreModeEnum: typeof ShowMoreModeEnum = ShowMoreModeEnum;
	public readonly categories$: Observable<any>;
	public readonly transportTypes$: Observable<any>;
	public readonly sortTypes: any[];

	public readonly formGroup: FormGroup;
	public readonly user$: any;
	public loading: boolean;

	public forceUpdate = new Subject();

	localTransportTypes: any;
	localCategories: any;

	private currentPageSource: BehaviorSubject<number> = new BehaviorSubject<number>(1);

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _offersService: OffersService,
		private readonly _categoriesService: CategoriesService,
		private readonly _transportTypesService: TransportTypesService,
		private readonly _authService: AuthService,
		private readonly _hotToastService: HotToastService,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly _translocoService: TranslocoService,
		private readonly _ampService: AmplitudeService,
		private readonly _router: Router,
		private readonly _route: ActivatedRoute
	) {
		this.setInitialPromoState();

		this.offersSkeletonOptions = this.getOffersSkeletonOptions();
		this.offersListTheme = "grid";
		this.b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;

		this.sortTypes = this.getSortTypes();
		this.formGroup = this.getFormGroup();
		this.formGroup.valueChanges.pipe(untilDestroyed(this)).subscribe((val) => {
			if (val.transportType || val.destinationTo || val.destinationFrom || val["categories[]"].length > 0) {
				this._ampService.logEvent("Use filters", {
					category: {
						transportType: val.transportType
							? this.localTransportTypes.find((el) => el._id == val.transportType).name
							: "",
						destinationFrom: val.destinationFrom,
						destinationTo: val.destinationTo,
						categories: val["categories[]"].length > 0 ? this.getCategoriesNames(val["categories[]"]) : [],
					},
				});
			}
		});

		this.categories$ = this.getCategories();
		this.transportTypes$ = this._transportTypesService.getTransportTypes().pipe(
			map((transports) =>
				transports.map((transport) => ({
					...transport,
					displayName: this._translocoService.translate(transport.displayName),
				}))
			),
			tap((transports) => (this.localTransportTypes = transports))
		);
		this.offers$ = this.getOffers();
		this.user$ = this._authService.getUser();
		this.offersCount$ = this._offersService.getAllOffersCount();
	}

	public ngOnInit(): void {
		this.offersPageInit();
	}

	public get currentPage$(): Observable<number> {
		return this.currentPageSource.asObservable();
	}

	public toggleShowMoreMode(): void {
		this.showMoreMode = this.showMoreMode === ShowMoreModeEnum.OUT ? 'in' : 'out';
	}

	public groupValueFn(value, ...args) {
		return value.value;
	}

	getCategoriesNames(categoriesIds: string[]) {
		const parsedCategories = this.parseCategories(this.localCategories);
		return categoriesIds.map((el) => parsedCategories[el].text);
	}

	parseCategories(categories, level = 1) {
		return categories.reduce((pre, curr) => {
			return {
				...pre,
				[curr.value]: { ...curr, level },
				...(curr.children && curr.children.length ? this.parseCategories([...curr.children], level + 1) : []),
			};
		}, {});
	}

	public getCategories() {
		return this._categoriesService.getCategories().pipe(
			map(({ categories }) =>
				categories.map((category) => ({
					text: category.name,
					value: category._id,
					collapsed: true,
					checked: false,
					children: category.children.map((level2Category) => ({
						text: level2Category.name,
						value: level2Category._id,
						collapsed: true,
						checked: false,
						// children: level2Category.children.map((level3Category) => ({
						// 	text: level3Category.name,
						// 	value: level3Category._id,
						// 	collapsed: true,
						// 	checked: false,
						// })),
					})),
				}))
			),
			tap((categories) => (this.localCategories = categories))
		);
	}

	public getOffers() {
		this.loading = true;
		return this.formGroup.valueChanges.pipe(
			switchMap((filters) => {
				const queryString = generateQueryString(filters);
				return this.forceUpdate.asObservable().pipe(
					startWith(true),
					switchMap(() => this._offersService.getOffers(queryString))
				);
			}),
			// map((offers) => offers.filter((offer) => !offer.hidden)),
			tap(() => {
				this.loading = false;
			})
		);
	}

	public clearFilters() {
		this.formGroup.reset();
	}

	public getFormGroup() {
		return this._formBuilder.group({
			"transportType": null,
			"categories[]": null,
			"destinationFrom": null,
			"destinationTo": null,
			"sort": null,
			"q": null,
			"offset": 0,
			"limit": 12,
		});
	}

	public getSortTypes() {
		return [
			{
				label: this._translocoService.translate("PLACEHOLDERS.SORT_RECENT"),
				value: "createdAt",
			},
			{
				label: this._translocoService.translate("PLACEHOLDERS.SORT_RECOMMENDED"),
				value: "DESC",
			},
		];
	}

	public changeOffersListTheme(theme: "list" | "grid") {
		this.offersListTheme = theme;
	}

	public toggleFavoriteOffers(offer: any) {
		if (offer.isSaved) {
			this._offersService
				.removeFavoriteOffer(offer._id)
				.pipe(
					untilDestroyed(this),
					this._hotToastService.observe({
						loading: this._translocoService.translate("OFFERS.REMOVE_FROM_SAVED_LOADING"),
						success: this._translocoService.translate("OFFERS.REMOVE_FROM_SAVED_SUCCESS"),
						error: this._translocoService.translate("OFFERS.REMOVE_FROM_SAVED_ERROR"),
					})
				)
				.subscribe((response) => {
					this.forceUpdate.next(true);
				});
		} else {
			this._offersService
				.addFavoriteOffer(offer._id)
				.pipe(
					untilDestroyed(this),
					this._hotToastService.observe({
						loading: this._translocoService.translate("OFFERS.ADDED_TO_SAVED_LOADING"),
						success: this._translocoService.translate("OFFERS.ADDED_TO_SAVED_SUCCESS"),
						error: this._translocoService.translate("OFFERS.ADDED_TO_SAVED_ERROR"),
					})
				)
				.subscribe((response) => {
					this.forceUpdate.next(true);
				});
		}
	}

	public getOffersSkeletonOptions() {
		return [
			{
				count: 5,
				animation: "progress",
				theme: {
					height: "160px",
				},
			},
		];
	}

	public getPageOffers(page): void {
		this.formGroup.patchValue({ offset: (page - 1) * 12, limit: 12 });

		this._router.navigate([], {
			relativeTo: this._route,
			queryParams: {
				page,
			},
			queryParamsHandling: "merge"
		});

		this.currentPageSource.next(page);
	}

	private setInitialPromoState(): void {
		if(localStorage.getItem(BrowserStorageKeysEnum.LATEST_OFFERS_VISITED)) {
			this.showMoreMode = ShowMoreModeEnum.OUT;
		} else {
			this.showMoreMode = ShowMoreModeEnum.IN;
			localStorage.setItem(BrowserStorageKeysEnum.LATEST_OFFERS_VISITED, 'true');
		}
	}

	private offersPageInit(): void {
		let page = this._route.snapshot.queryParams.page;
		if (!page) {
			this._router.navigate([], {
				relativeTo: this._route,
				queryParams: {
					page: 1,
				},
				queryParamsHandling: "merge"
			});
			page = 1
		}

		this.getPageOffers(+page);
	}
}
