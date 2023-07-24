import { ChangeDetectionStrategy, Component } from '@angular/core';
import { B2bNgxSelectThemeEnum } from '@b2b/ngx-select';
import { FormBuilder, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { B2bNgxButtonThemeEnum } from 'libs/ngx-button/src';
import { B2bNgxInputThemeEnum } from 'libs/ngx-input/src';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { CategoriesService } from '../../../services/categories/categories.service';
import { WikiService } from 'src/app/client/services/wiki/wiki.service';

function generateQueryString(obj) {
  return Object.entries(obj)
    .filter(([key, value]: any) => !!value && value?.length)
    .reduce((queryString: string, [key, value]: any) => {
      return Array.isArray(value)
        ? `${queryString}${value.reduce(
            (str, arrayItem, index) =>
              `${str}${key}=${arrayItem}${
                index + 1 === value.length ? '' : '&'
              }`,
            ''
          )}`
        : `${queryString}${key}=${value}&`;
    }, '?');
}
function stripHtml(html) {
  // Create a new div element
  const temporalDivElement = document.createElement('div');
  // Set the HTML content with the providen
  temporalDivElement.innerHTML = html;
  // Retrieve the text property of the element (cross-browser support)
  return temporalDivElement.textContent || temporalDivElement.innerText || '';
}

@Component({
  selector: 'b2b-client-trading-wiki',
  templateUrl: './client-trading-wiki.component.html',
  styleUrls: ['./client-trading-wiki.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTradingWikiComponent {
  public readonly socialMedias: any;
  public readonly articles$: Observable<any>;
  public readonly articlesSkeletonOptions: any[];

  public readonly searchControl: FormControl<string>;

  public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;
  public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
  public readonly b2bNgxSelectThemeEnum: typeof B2bNgxSelectThemeEnum;

  public readonly formGroup: FormGroup;
  public readonly categories$: Observable<any>;
  public readonly tags$: Observable<any>;

  public loading: boolean;
  public totalCount: any;

  public pageSubject: Subject<any>;
  public readonly searchSubject: BehaviorSubject<any>;
  public readonly search$: Observable<any>;
  localCategories: any;

  constructor(
    private readonly _wikiService: WikiService,
    private readonly _categoriesService: CategoriesService,
    private readonly _formBuilder: FormBuilder
  ) {
    this._ampService.logEvent('View trade wiki');
    this.b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
    this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
    this.b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;

    this.pageSubject = new Subject();
    this.searchSubject = new BehaviorSubject<any>('');

    this.search$ = this.searchSubject.asObservable();

    this.articlesSkeletonOptions = this.getArticlesSkeletonOptions();
    this.socialMedias = this.getSocialMedias();
    this.searchControl = new FormControl<string>();
    this.categories$ = this.getCategories();

    this.formGroup = this.getFormGroup();
    this.articles$ = this.getArticles();
    this.tags$ = this.getTags();

    this.formGroup.valueChanges.pipe(untilDestroyed(this)).subscribe((val) => {
      if (
        val['categories[]'].length > 0 ||
        val['countries[]'].length > 0 ||
        val['tags[]'].length > 0
      ) {
        this._ampService.logEvent('Use trade wiki filters', {
          category: {
            categories:
              val['categories[]'].length > 0
                ? this.getCategoriesNames(val['categories[]'])
                : [],
            countries: val['countries[]'],
            tags: val['tags[]'],
          },
        });
      }
    });
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
        ...(curr.children && curr.children.length
          ? this.parseCategories([...curr.children], level + 1)
          : []),
      };
    }, {});
  }

  public setPage(offset) {
    this.formGroup.patchValue({
      offset,
    });
  }

  public clearFilters() {
    this.formGroup.reset();
  }

  public getFormGroup() {
    return this._formBuilder.group({
      q: '',
      'categories[]': '',
      'countries[]': '',
      'tags[]': '',
      offset: 0,
    });
  }

  public searchTags(str) {
    this.searchSubject.next(str);
  }

  public getTags() {
    return this.search$.pipe(
      filter((term) => term.length > 1),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((value) => this._wikiService.getTags(value))
    );
  }

  public getArticles() {
    return this.formGroup.valueChanges.pipe(
      startWith({ limit: 10 }),
      tap(() => {
        this.loading = true;
      }),
      switchMap((filters) => {
        const queryString = generateQueryString(filters);

        return this._wikiService.getArticles(queryString);
      }),
      map((res) => {
        this.loading = false;
        this.totalCount = res.totalCount;

        const posts = res.posts.map((post) => ({
          ...post,
          preview: stripHtml(post.description),
        }));

        return posts;
      })
    );
  }

  public getArticlesSkeletonOptions() {
    return [
      {
        count: 4,
        animation: 'progress',
        theme: {
          height: '230px',
        },
      },
    ];
  }

  public getSocialMedias() {
    return [
      {
        icon: 'facebook-gray',
        href: 'https://www.facebook.com/',
      },
      {
        icon: 'twitter-gray',
        href: 'https://twitter.com/',
      },
      {
        icon: 'instagram-gray',
        href: 'https://www.instagram.com/?hl=ru',
      },
      {
        icon: 'pinterest-gray',
        href: 'https://www.pinterest.com/',
      },
      {
        icon: 'behance-gray',
        href: 'https://www.behance.net/',
      },
      {
        icon: 'google-gray',
        href: 'https://www.google.com.ua/?hl=ru',
      },
    ];
  }

  public groupValueFn(value, ...args) {
    return value.value;
  }

  public getCategories() {
    return this._categoriesService.getWikiCategories().pipe(
      map((categoris) =>
        categoris
          .map((category) => ({
            text: category.name,
            value: category._id,
            collapsed: true,
            checked: false,
            children: category.children.map((child) => ({
              text: child.name,
              value: child._id,
              collapsed: true,
              checked: false,
            })),
          }))
          .filter((category) => category.children?.length)
      ),
      tap((categories) => (this.localCategories = categories))
    );
  }

  public getPageOffers(pageNumber) {
    this.formGroup.patchValue({ offset: pageNumber * 10, limit: 10 });
  }
}
