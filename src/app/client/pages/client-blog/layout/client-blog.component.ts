import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import {B2bNgxSelectThemeEnum} from "@b2b/ngx-select";
import {FormBuilder, FormGroup} from "@ngneat/reactive-forms";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {map, startWith, switchMap, tap} from "rxjs/operators";
import {BlogService} from "../../../services/blog/blog.service";
import {PaginationParamsModel} from "../../../../core/models/pagination-params.model";
import {ActivatedRoute, Router} from "@angular/router";

function generateQueryString(obj, initialValue: string = "?") {
	return Object.entries(obj)
		.filter(([, value]: any) => !!value)
		.reduce((queryString: string, [key, value]: any) => {
			return Array.isArray(value)
				? `${queryString}${value.reduce((str, arrayItem) => `${str}${key}=${arrayItem}&`, "")}`
				: `${queryString}${key}=${value}&`;
		}, initialValue);
}

function stripHtml(html) {
	// Create a new div element
	const temporalDivElement = document.createElement("div");
	// Set the HTML content with the providen
	temporalDivElement.innerHTML = html;
	// Retrieve the text property of the element (cross-browser support)
	return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

@Component({
	selector: "b2b-client-blog",
	templateUrl: "./client-blog.component.html",
	styleUrls: ["./client-blog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientBlogComponent implements OnInit {
	public readonly socialMedias: any;
	public readonly articles$: Observable<any>;
	public readonly articlesSkeletonOptions: any[];

	// public readonly searchControl: FormControl<string>;

	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxSelectThemeEnum: typeof B2bNgxSelectThemeEnum;

	public readonly formGroup: FormGroup;
	// public readonly categories$: Observable<any>;
	public readonly tags$: Observable<any>;

	public loading: boolean;
	public totalCount: any;

	public pageSubject: Subject<any>;
	public readonly searchSubject: BehaviorSubject<any>;
	public readonly search$: Observable<any>;
	public totalBlogLength$: Observable<number> = this._blogService.blogLength$;
	public currentPageSource: BehaviorSubject<number> = new BehaviorSubject<number>(1);

	private filteredQueryObj: PaginationParamsModel = {limit: 7, offset: 0};

	constructor(private readonly _blogService: BlogService,
							private readonly _formBuilder: FormBuilder,
							private readonly _route: ActivatedRoute,
							private readonly _router: Router) {
		this.b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;

		this.pageSubject = new Subject();
		this.searchSubject = new BehaviorSubject<any>("");

		this.search$ = this.searchSubject.asObservable();

		this.articlesSkeletonOptions = this.getArticlesSkeletonOptions();
		this.socialMedias = this.getSocialMedias();
		// this.searchControl = new FormControl<string>();
		// this.categories$ = this.getCategories();

		this.formGroup = this.getFormGroup();
		this.articles$ = this.getArticles();
		// this.tags$ = this.getTags();
	}

	ngOnInit() {
		this.blogPageInit();
	}

	public get currentPage$(): Observable<number> {
		return this.currentPageSource.asObservable();
	}

	public setPage(offset) {
		this.formGroup.patchValue({
			offset,
		});
	}

	public togglePageBlogList(page: number): void {
		this.filteredQueryObj = {...this.filteredQueryObj, offset: (page - 1) * 7};
		this._blogService.updateBlogList(generateQueryString(this.filteredQueryObj));
		this._router.navigate([], {
			relativeTo: this._route,
			queryParams: {
				page,
			},
			queryParamsHandling: "merge"
		});

		this.currentPageSource.next(page);
	}

	// public clearFilters() {
	// 	this.formGroup.reset();
	// }

	public getFormGroup() {
		return this._formBuilder.group({
			q: "",
			// "categories[]": "",
			// "countries[]": "",
			// "tags[]": "",
			offset: 0,
		});
	}

	public searchTags(str) {
		this.searchSubject.next(str);
	}

	// public getTags() {
	// 	return this.search$.pipe(
	// 		filter((term) => term.length > 1),
	// 		debounceTime(1000),
	// 		distinctUntilChanged(),
	// 		switchMap((value) => this._blogService.getTags(value))
	// 	);
	// }

	public getArticles() {
		return this.formGroup.valueChanges.pipe(
			startWith({limit: 10}),
			tap(() => {
				this.loading = true;
			}),
			switchMap((filters) => {
				const queryString = generateQueryString(filters);

				return this._blogService.getArticles(queryString);
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
				animation: "progress",
				theme: {
					height: "230px",
				},
			},
		];
	}

	public getSocialMedias() {
		return [
			{
				icon: "facebook-gray",
				href: "https://www.facebook.com/",
			},
			{
				icon: "twitter-gray",
				href: "https://twitter.com/",
			},
			{
				icon: "instagram-gray",
				href: "https://www.instagram.com/?hl=ru",
			},
			{
				icon: "pinterest-gray",
				href: "https://www.pinterest.com/",
			},
			{
				icon: "behance-gray",
				href: "https://www.behance.net/",
			},
			{
				icon: "google-gray",
				href: "https://www.google.com.ua/?hl=ru",
			},
		];
	}

	public groupValueFn(value, ...args) {
		return value.value;
	}

	// public getCategories() {
	// 	return this._categoriesService.getWikiCategories().pipe(
	// 		map((categoris) =>
	// 			categoris
	// 				.map((category) => ({
	// 					text: category.name,
	// 					value: category._id,
	// 					collapsed: true,
	// 					checked: false,
	// 					children: category.children.map((child) => ({
	// 						text: child.name,
	// 						value: child._id,
	// 						collapsed: true,
	// 						checked: false,
	// 					})),
	// 				}))
	// 				.filter((category) => category.children?.length)
	// 		)
	// 	);
	// }

	public getPageOffers(pageNumber) {
		this.formGroup.patchValue({offset: pageNumber * 10, limit: 10});
	}

	private blogPageInit(): void {
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

		this.togglePageBlogList(+page);
	}
}
