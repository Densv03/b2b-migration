import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
} from "@angular/core";
import {ClientMarketplaceService} from "../client-marketplace.service";
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {B2bNgxSelectThemeEnum} from "@b2b/ngx-select";
import {B2bNgxLinkThemeEnum} from "@b2b/ngx-link";
import {FormGroup} from "@angular/forms";
import {FormBuilder} from "@ngneat/reactive-forms";
import {AuthService} from "../../../../auth/services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";
import {PaginationParamsModel} from "../../../../core/models/pagination-params.model";
import {filter, map, skip, switchMap, takeUntil} from "rxjs/operators";
import {CategoriesService} from "../../../services/categories/categories.service";
import {InitialCategoryState} from "../shared/models/initial-category-state.model";
import {SlideInOutAnimation} from "../shared/animations/slide-in-out.animation";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {SortType} from "../../../../core/models/sort-type.model";

function generateQueryString(obj, initialValue: string = "?") {
	const filteredState = obj;
	for (const filteredStateKey in filteredState) {
		if (!filteredState[filteredStateKey]) {
			filteredState[filteredStateKey] = undefined;
		}
	}
	return Object.entries(filteredState)
		.filter(([, value]: any) => !!value)
		.reduce((queryString: string, [key, value]: any) => {
			return Array.isArray(value)
				? `${queryString}${value.reduce((str, arrayItem) => `${str}${key}=${arrayItem}&`, "")}`
				: `${queryString}${key}=${value}&`;
		}, initialValue);
}
@UntilDestroy()
@Component({
	selector: "b2b-client-marketplace",
	templateUrl: "./client-marketplace.component.html",
	styleUrls: ["./client-marketplace.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [SlideInOutAnimation],
})
export class ClientMarketplaceComponent implements OnInit, AfterViewInit, OnDestroy {
	public queryParams: any = this.route.snapshot.queryParams;

	public marketplaceProducts$: Observable<any> = this.clientMarketplaceService.marketplaceProducts$;
	public totalMarketplaceProductsLength$: Observable<number> = this.clientMarketplaceService.marketplaceProductsLength$;
	// public loadMorePaginatorIsVisible$: Observable<boolean> = this.clientMarketplaceService.marketplaceProductsPaginatorIsVisible$;
	public offersListTheme: "list" | "grid" = "grid";
	public sortTypes: SortType[] = this.getSortTypes();

	public PRODUCTS_LIMIT: number = this.clientMarketplaceService.PRODUCTS_LIMIT;
	public readonly user$: any;

	public readonly formGroup: FormGroup = this.getFormGroup();
	public readonly desktopFilters: FormGroup = this.fb.group({
		filters: [],
	});

	public readonly mobileFilters: FormGroup = this.fb.group({
		filters: [],
	});

	public categoriesInitialState$: Observable<InitialCategoryState> = this.getObservableForCategories();

	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxSelectThemeEnum: typeof B2bNgxSelectThemeEnum;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;

	public animationState: "in" | "out" = "out";

	@ViewChild("backdrop", {static: true}) backdrop?: ElementRef;

	private componentIsDestroyed: Subject<void> = new Subject<void>();
	private filteredQueryObj: PaginationParamsModel = {limit: this.PRODUCTS_LIMIT, offset: 0};

	private listingState: { [key: string]: any };
	private animationStateSource: BehaviorSubject<"in" | "out"> = new BehaviorSubject<"in" | "out">("out");
	private mobileFiltersPlaceholderSource: BehaviorSubject<string> = new BehaviorSubject<string>("All");
	private currentPageSource: BehaviorSubject<number> = new BehaviorSubject<number>(1);


	constructor(
		private clientMarketplaceService: ClientMarketplaceService,
		private authService: AuthService,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private categoriesService: CategoriesService,
		private changeDetectorRef: ChangeDetectorRef,
		private router: Router
	) {
		this.b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;

		this.user$ = this.authService.getUser();
		this.listingState = {
			"q": "",
			"categories[]": undefined,
			"country": null,
			"type": null,
			"relevance": false,
		};
	}

	public ngOnInit(): void {
		this.initQueryParams();
		this.initFilters(this.desktopFilters);
		this.initFilters(this.mobileFilters);
		this.initPagination();
		this.getProductsOnRouteChange();
	}

	public ngAfterViewInit(): void {
		if (this.backdrop) {
			this.backdrop.nativeElement.addEventListener("click", (e: MouseEvent) => {
				if (e.target == this.backdrop.nativeElement) {
					this.toggleShowPopUp();
					this.changeDetectorRef.markForCheck();
				}
			});
		}
	}

	public get currentPage$(): Observable<number> {
		return this.currentPageSource.asObservable();
	}

	public get animationState$(): Observable<"in" | "out"> {
		return this.animationStateSource.asObservable();
	}


	public get mobileFiltersPlaceholder$(): Observable<string> {
		return this.mobileFiltersPlaceholderSource.asObservable();
	}

	public toggleShowPopUp(): void {
		this.animationState = this.animationState === "in" ? "out" : "in";
	}

	public changeOffersListTheme(theme: "list" | "grid") {
		this.offersListTheme = theme;
	}

	public updateSortType(e: { label: string; value: string }) {
		if (e) {
			const type: string = e?.label;
			this.listingState = {
				...this.listingState,
				relevance: type === "Relevance",
			};
			this.clientMarketplaceService.updateMarketplaceProducts(generateQueryString(this.listingState));
		}
	}

	public searchProducts(): void {
		this.clientMarketplaceService.updateMarketplaceProducts({q: this.formGroup.value.q});
	}

	public togglePage(page: number): void {
		this.listingState['page'] = page;

		this.clientMarketplaceService.updateMarketplaceProducts(
			generateQueryString(this.listingState),
			(page - 1) * this.clientMarketplaceService.PRODUCTS_LIMIT
		);
		this.router.navigate([], {
			queryParams: {
				page
			},
			queryParamsHandling: "merge"
		});

		this.currentPageSource.next(page);
	}

	public loadMoreProducts(clicksAmount: number): void {
		this.filteredQueryObj = {...this.filteredQueryObj, limit: this.filteredQueryObj.limit + this.PRODUCTS_LIMIT};
		// this.clientMarketplaceService.updateMarketplaceProducts(this.filteredQueryObj, clicksAmount);
	}

	public closePopUp(): void {
		this.animationStateSource.next("out");
	}

	public openPopUp(): void {
		this.animationStateSource.next("in");
	}

	public updateMobileFiltersPlaceholder(newPlaceholder: string): void {
		this.mobileFiltersPlaceholderSource.next(newPlaceholder);
	}

	private getSortTypes(): SortType[] {
		return [
			{
				value: "createdAt",
				label: "Recent",
			},
			{
				value: "DESC",
				label: "Relevance",
			},
		];
	}

	private getFormGroup(): FormGroup {
		return this.fb.group({
			"transportType": null,
			"categories[]": null,
			"sort": null,
			"q": null,
			"offset": 0,
			"limit": 12,
		});
	}
	private initQueryParams(): void {
		if (this.queryParams.q) {
			this.listingState.q = this.queryParams.q;
			this.formGroup.patchValue({q: this.queryParams.q});
		}

		this.formGroup
			.get("q")
			.valueChanges.pipe(
			takeUntil(this.componentIsDestroyed),
			tap((res) => (this.listingState.q = res)),
			switchMap(() => {
				return this.clientMarketplaceService.getMarketplaceProducts(generateQueryString(this.listingState));
			})
		)
			.subscribe((res) => {
				this.clientMarketplaceService.updateMarketplaceProductsOnSearch(res);
			});
	}

	private getObservableForCategories(): Observable<InitialCategoryState> {
		return this.categoriesService.getCategories().pipe(
			map((categories) => categories.categories),
			map((categories) => {
				const ans = {name: "", _id: ""};
				categories.forEach((parentCategory) => {
					if (parentCategory._id === this.queryParams.categories) {
						ans._id = parentCategory._id;
						ans.name = parentCategory.name;
					} else {
						parentCategory.children.forEach((childCategories) => {
							if (childCategories._id === this.queryParams.categories) {
								ans._id = childCategories._id;
								ans.name = childCategories.name;
							}
						});
					}
				});
				return ans;
			})
		);
	}

	private initFilters(formGroupFilters: FormGroup): void {
		formGroupFilters.get('filters').setValue(this.route.snapshot.queryParams)

		formGroupFilters.get('filters').valueChanges
			.subscribe(filters => {
			this.router.navigate([], {
				queryParams: {...filters},
			});
			this.currentPageSource.next(1)

			this.listingState = {
				...this.listingState,
				...filters,
			};
			// FIXME: remove this if it's not needed
			if (Object.values(filters).length) {
				this.clientMarketplaceService.updateMarketplaceProducts(generateQueryString(this.listingState),
					(this.listingState.page - 1) * this.PRODUCTS_LIMIT );
			} else {
				this.listingState = {
					...this.listingState,
					"categories[]": null,
					"country": null,
					"type": null,
				};
				// this.clientMarketplaceService.updateMarketplaceProducts(generateQueryString(this.listingState));
			}

		});
		formGroupFilters.get('filters').updateValueAndValidity();
	}

	private initPagination(): void {
		const page = this.route.snapshot.queryParams.page;
		if (page) {
			this.togglePage(page);
		}
	}

	private getProductsOnRouteChange(): void {
		this.route.queryParams
			.pipe(skip(1), untilDestroyed(this))
			.subscribe(data => {
				this.clientMarketplaceService.updateMarketplaceProducts(generateQueryString(this.listingState),
					(this.listingState.page - 1) * this.PRODUCTS_LIMIT );
			})
	}

	ngOnDestroy(): void {
		this.componentIsDestroyed.next();
	}
}