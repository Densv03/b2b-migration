import { ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {map, startWith, switchMap, tap} from "rxjs/operators";
import {HotToastService} from "@ngneat/hot-toast";
import {B2bNgxLinkService, B2bNgxLinkThemeEnum} from "@b2b/ngx-link";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ShowMoreModeEnum} from "../enums/show-more-mode.enum";
// import {BrowserStorageKeysEnum} from "../../../../shared/enums/browser-storage-keys.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {B2bNgxSelectThemeEnum} from "@b2b/ngx-select";
import {OffersService} from "../../../services/offers/offers.service";
import {CategoriesService} from "../../../services/categories/categories.service";
import {TransportTypesService} from "../../../services/transport-types/transport-types.service";
import {AuthService} from "../../../../auth/services/auth/auth.service";
import {BrowserStorageKeysEnum} from "../../../shared/enums/browser-storage-keys.enum";
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {TranslocoService} from "@ngneat/transloco";

function toFlat(arr: any[]): any {
  return arr.reduce((pre, {children = [], ...cur}) => [...pre, ...toFlat(children), cur], []);
}

function generateQueryString(obj: any) {
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
  public offers$: Observable<any>;
  public offersSkeletonOptions: any[];
  public offersCount$: Observable<number>;

  public b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;
  public b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
  public b2bNgxSelectThemeEnum: typeof B2bNgxSelectThemeEnum;
  public b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;

  public offersListTheme: "list" | "grid" = 'list';
  public showMoreMode!: "in" | "out";
  public showMoreModeEnum: typeof ShowMoreModeEnum = ShowMoreModeEnum;
  public categories$: Observable<any>;
  public transportTypes$: Observable<any>;
  public sortTypes: any[];

  public formGroup: FormGroup;
  public user$: Observable<any>;
  public loading!: boolean;

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
      if (val.transportType || val.destinationTo || val.destinationFrom || val["categories[]"]?.length > 0) {
      }
    });

    this.categories$ = this.getCategories();
    this.transportTypes$ = this._transportTypesService.getTransportTypes().pipe(
      map((transports: any[]) =>
        transports.map((transport: any) => ({
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
    setTimeout(() => {
      this.formGroup.updateValueAndValidity();
    }, 100);
    this.offersPageInit();
  }

  public get currentPage$(): Observable<number> {
    return this.currentPageSource.asObservable();
  }

  public toggleShowMoreMode(): void {
    this.showMoreMode = this.showMoreMode === ShowMoreModeEnum.OUT ? 'in' : 'out';
  }

  public groupValueFn(value: any, ...args: any[]) {
    return value.value;
  }

  getCategoriesNames(categoriesIds: string[]) {
    const parsedCategories = this.parseCategories(this.localCategories);
    return categoriesIds.map((el) => parsedCategories[el].text);
  }

  parseCategories(categories: any, level = 1) {
    return categories.reduce((pre: any, curr: any) => {
      return {
        ...pre,
        [curr.value]: {...curr, level},
        ...(curr.children && curr.children.length ? this.parseCategories([...curr.children], level + 1) : []),
      };
    }, {});
  }

  public getCategories() {
    return this._categoriesService.getCategories().pipe(
      map(({categories}) =>
        categories.map((category: any) => ({
          text: category.name,
          value: category._id,
          collapsed: true,
          checked: false,
          children: category.children.map((level2Category: any) => ({
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

  public getOffers(): Observable<any> {
    this.loading = true;
    return this.formGroup.valueChanges.pipe(
      switchMap((filters) => {
        const queryString = generateQueryString(filters);
        return this.forceUpdate.asObservable().pipe(
          startWith(true),
          switchMap(() => this._offersService.getOffers(queryString))
        );
      }),
      map((offers) => offers.filter((offer: any) => !offer.hidden)),
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
        .subscribe((response: any) => {
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
        .subscribe((response: any) => {
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

  public getPageOffers(page: any): void {
    this.formGroup.patchValue({offset: (page - 1) * 12, limit: 12});

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
    if (localStorage.getItem(BrowserStorageKeysEnum.LATEST_OFFERS_VISITED)) {
      this.showMoreMode = ShowMoreModeEnum.OUT;
    } else {
      this.showMoreMode = ShowMoreModeEnum.IN;
      localStorage.setItem(BrowserStorageKeysEnum.LATEST_OFFERS_VISITED, 'true');
    }
  }

  private offersPageInit(): void {
    let page = this._route.snapshot.queryParams['page'];
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
