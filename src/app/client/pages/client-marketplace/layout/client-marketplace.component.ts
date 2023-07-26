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
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../auth/services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable, of, Subject, tap} from "rxjs";
import {PaginationParamsModel} from "../../../../core/models/pagination-params.model";
import {map, skip, switchMap, takeUntil, filter, first} from "rxjs/operators";
import {CategoriesService} from "../../../services/categories/categories.service";
import {InitialCategoryState} from "../shared/models/initial-category-state.model";
import {SlideInOutAnimation} from "../shared/animations/slide-in-out.animation";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {SortType} from "../../../../core/models/sort-type.model";
import {User} from "../../../../core/models/user/user.model";

function generateQueryString(obj: any, initialValue: string = "?") {
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
	public readonly user$: Observable<User>;

	public readonly formGroup: FormGroup = this.getFormGroup();
  public readonly desktopFilters: FormGroup = new FormGroup<{filters: FormControl}>({
    filters: new FormControl(null),
  });

  public readonly mobileFilters: FormGroup = new FormGroup<{ filters: FormControl }>({
    filters: new FormControl(null),
  });

	public categoriesInitialState$: Observable<InitialCategoryState> = this.getObservableForCategories();

	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxSelectThemeEnum: typeof B2bNgxSelectThemeEnum;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;

	public filterValue: any;

	public animationState: "in" | "out" = "out";

	@ViewChild("backdrop", {static: true}) backdrop?: ElementRef;

	private componentIsDestroyed: Subject<void> = new Subject<void>();
	private filteredQueryObj: PaginationParamsModel = {limit: this.PRODUCTS_LIMIT, offset: 0};

	private listingState: { [key: string]: any };
	private animationStateSource: BehaviorSubject<"in" | "out"> = new BehaviorSubject<"in" | "out">("out");
	private mobileFiltersPlaceholderSource: BehaviorSubject<string> = new BehaviorSubject<string>("All");
	private currentPageSource: BehaviorSubject<number> = new BehaviorSubject<number>(1);
	private categoryFilterName: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public sectors: Observable<any>;
  public filters = [
    {
      name: 'Sectors',
      isOpen: true,
      selectedOption: new BehaviorSubject(null),
      options$: this.categoriesService.getCategories()
        .pipe(filter(data => !!data.totalCount), map( data => data.categories))
    },
    {
      name: 'Company type',
      isOpen: false,
      selectedOption: new BehaviorSubject(null),
      options$: of([
        {name: 'Manufacturer', count: 45},
        {name: 'Wholesaler', count: 21},
        {name: 'Distributor', count: 34},
        {name: 'Agent', count: 49},
      ])
    }
  ]

	constructor(
		private clientMarketplaceService: ClientMarketplaceService,
		private authService: AuthService,
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
    return new FormGroup<any>({
      "transportType": new FormControl(null),
      "categories[]": new FormControl(null),
      "sort": new FormControl(null),
      "q": new FormControl(null),
      "offset": new FormControl(0),
      "limit": new FormControl(12),
    });
	}
	private initQueryParams(): void {
		if (this.queryParams.q) {
			this.listingState['q'] = this.queryParams.q;
			this.formGroup.patchValue({q: this.queryParams.q});
		}

		this.formGroup
			.get("q")
			.valueChanges.pipe(
			takeUntil(this.componentIsDestroyed),
			tap((res) => (this.listingState['q'] = res)),
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
				categories.forEach((parentCategory: any) => {
					if (parentCategory._id === this.queryParams.categories) {
						ans._id = parentCategory._id;
						ans.name = parentCategory.name;
					} else {
						parentCategory.children.forEach((childCategories: any) => {
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
		this.filterValue = {...this.route.snapshot.queryParams};

		if (this.route.snapshot.params?.['category']) {
			const ids = localStorage.getItem('categoryId');
			this.filterValue['categories[]'] = ids.includes(';') ? ids.split(';') : ids;
		}
		// formGroupFilters.get('filters').setValue(this.filterValue);
		// console.log(this.filterValue);

		formGroupFilters.get('filters').valueChanges
			.subscribe(filters => {
				if (filters['categories[]']) {
					// console.log(filters['categories[]']);

					this.getCategoryName(filters['categories[]']);
					if (!!this.categoryFilterName.getValue() && this.categoryFilterName.value !== this.route.snapshot.params?.['category']) {
						localStorage.setItem('categoryId', (filters['categories[]'] instanceof Array ?
							filters['categories[]'].join(';')
							: filters['categories[]']));
						// console.log(this.categoryFilterName.value)
						this.router.navigate(['/b2bmarket/listing', this.categoryFilterName.value]);
					}
				}

				if (!filters['categories[]']) {
					console.log(filters)
					this.router.navigate([], {
						queryParams: {...filters},
					});
				}
				this.currentPageSource.next(1)

				this.listingState = {
					...this.listingState,
					...filters,
				};
				// FIXME: remove this if it's not needed
				if (Object.values(filters).length) {
					this.clientMarketplaceService.updateMarketplaceProducts(generateQueryString(this.listingState),
						(this.listingState['page'] - 1) * this.PRODUCTS_LIMIT);
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
		const page = this.route.snapshot.queryParams['page'];
		if (page) {
			this.togglePage(page);
		}
	}

	private getProductsOnRouteChange(): void {
		this.route.queryParams
			.pipe(skip(1), untilDestroyed(this))
			.subscribe(data => {
				this.clientMarketplaceService.updateMarketplaceProducts(generateQueryString(this.listingState),
					(this.listingState['page'] - 1) * this.PRODUCTS_LIMIT );
			})
	}

	private getCategoryName(category: string | string[]): void {
		if (category instanceof Array) {
			const categories: any[] = [];
			category.map(el => {
				this.categoriesService.getCategoryNameById(el).pipe(filter(data => !!data), first()).subscribe(categoryName => {
					categories.push(categoryName);
				});
				this.categoryFilterName.next(categories.join(';'));
			});
		} else {
			this.categoriesService.getCategoryNameById(category).pipe(filter(data => !!data), first()).subscribe(categoryName => {
				this.categoryFilterName.next(categoryName)
			});
		}
	}


	ngOnDestroy(): void {
		this.componentIsDestroyed.next();
	}

  chooseFilter(option: any, filterIndex: number) {
    this.filters[filterIndex].selectedOption.next(option);
  }
  isOptionSelected(option: any, filterIndex: number) {
    if (this.filters[filterIndex].selectedOption.getValue()) {
      return option.name === this.filters[filterIndex].selectedOption.getValue().name;
    } return false;
  }
}
