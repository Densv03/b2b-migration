import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";
import { HotToastService } from "@ngneat/hot-toast";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BlogService } from "../../../../client/services/blog/blog.service";
import {combineLatest, forkJoin, Observable} from "rxjs";
import { debounceTime, distinctUntilChanged, filter, first, map, startWith, switchMap } from "rxjs/operators";
import { CategoriesService } from "../../../../client/services/categories/categories.service";
import { capitalizeFirstLetter } from "../../../../core/helpers/function/capitalize-first-letter";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import {AngularEditorConfig} from "@kolkov/angular-editor";

enum BLOG_ACTION {
	CREATE,
	EDIT,
}

const EDITOR_CONFIG: AngularEditorConfig = {
	editable: true,
	spellcheck: true,
	height: "auto",
	minHeight: "200px",
	translate: "yes",
	enableToolbar: true,
	showToolbar: true,
	placeholder: "Enter text here...",
	fonts: [
		{ class: "arial", name: "Arial" },
		{ class: "times-new-roman", name: "Times New Roman" },
		{ class: "calibri", name: "Calibri" },
		{ class: "comic-sans-ms", name: "Comic Sans MS" },
	],
	sanitize: true,
	toolbarPosition: "top",
};

@UntilDestroy()
@Component({
	selector: "b2b-admin-blog-post",
	templateUrl: "./admin-blog-post.component.html",
	styleUrls: ["./admin-blog-post.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBlogPostComponent implements OnInit {
	public readonly formGroup: FormGroup;
	public readonly editorConfig: AngularEditorConfig;
	public readonly b2bNgxSelectThemeEnum: typeof B2bNgxSelectThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;

	public blogAction = this.activatedRoute.snapshot.params["id"] === "create" ? BLOG_ACTION.CREATE : BLOG_ACTION.EDIT;

	public blogActionEnum = BLOG_ACTION;

	public level1Categories: any;
	public level2Categories: any;

	public readonly searchControl = new FormControl();
	public readonly searchedOptions$: Observable<any>;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly categoriesService: CategoriesService,
		private readonly hotToastService: HotToastService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly blogService: BlogService,
		private readonly router: Router
	) {
		this.b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

		this.editorConfig = EDITOR_CONFIG;

		this.formGroup = this.getFormGroup();
		this.level1Categories = [];
		this.level2Categories = [];

		this.searchedOptions$ = this.getSearchedOptions();
	}

	public getSearchedOptions(): Observable<any> {
		return this.searchControl.valueChanges.pipe(
			debounceTime(1000),
			distinctUntilChanged(),
			startWith(""),
			switchMap((search) => this.blogService.getTags(search))
		);
	}

	public setSearch(search: any) {
		this.searchControl.setValue(search);
	}

	public setLevel1Categories() {
		this.categoriesService
			.getWikiCategories()
			.pipe(untilDestroyed(this))
			.subscribe((categories) => {
				this.level1Categories = categories;
			});
	}

	public setLevel2Categories() {
		this.formGroup
			.get("level1Category")
			.valueChanges.pipe(
				untilDestroyed(this),
				filter((level1CategoryId) => !!level1CategoryId)
			)
			.subscribe((level1CategoryId: any) => {
				this.level2Categories = this.level1Categories.find(
					(level1Category: { _id: any; }) => level1Category._id === level1CategoryId
				)?.children;
			});
	}

	public updateArticle() {
		const articleById$ = this.activatedRoute.paramMap.pipe(
			map((paramMap) => paramMap.get("id")),
			filter((id) => !!id),
			switchMap((id) => this.blogService.getArticleById(id))
		);

		const categories$ = this.categoriesService.getWikiCategories();

		combineLatest([articleById$, categories$])
			.pipe(untilDestroyed(this))
			.subscribe(([article, categories]) => {
				const level2CategoryId = article.category;
				const level1CategoryId = categories.find((level1Category: { children: any[]; }) =>
					level1Category?.children.find((level2Category) => level2Category._id === level2CategoryId)
				)?._id;
				this.formGroup.patchValue({
					...article,
					image: [article.image],
					level1Category: level1CategoryId,
					level2Category: level2CategoryId,
				});
			});
	}

	ngOnInit() {
		this.updateArticle();
		this.setLevel1Categories();
		this.setLevel2Categories();
	}

	public getFormGroup(): FormGroup {
		return this.formBuilder.group({
			_id: null,
			title: "",
			description: "",
			author: "",
			image: "",
			country: [null],
			tags: [[]],
			level1Category: [null],
			level2Category: [null],
			shortDescription: ["", Validators.maxLength(140)],
			alt1: [null],
			alt2: [null],
			alt3: [null],
			alt4: [null],
		});
	}

	public onSubmit(data: { _id: any; level2Category: any; title: any; country: any; description: any; author: any; image: any; shortDescription: any; alt1: any; alt2: any; alt3: any; alt4: any; }): void {
		if (!this.formGroup.valid) {
			return;
		}
		let { _id, level2Category, title, country, description, author, image, shortDescription, alt1, alt2, alt3, alt4 } =
			data;

		const postAction: BLOG_ACTION = _id ? BLOG_ACTION.EDIT : BLOG_ACTION.CREATE;

		const body: any = {
			title,
			description,
			author,
			country,
			category: level2Category,
			shortDescription,
		};

		description = description.replaceAll("<a", '<a rel="nofollow"');
		description = description.replaceAll("<a", '<a target="_blank""');

		const imageAltsArr = [alt1, alt2, alt3, alt4];
		let imageCounter = 0;
		body.description = description.split("");
		if (imageAltsArr[0])
			for (let i = 0; i < description.length - 6; ++i) {
				if (
					description[i] === "<" &&
					description[i + 1] === "i" &&
					description[i + 2] === "m" &&
					description[i + 3] === "g" &&
					description[i + 4] === " " &&
					description[i + 5] === "a"
				) {
					if (imageAltsArr[imageCounter]) {
						body.description.splice(i, 6, `<img alt="${imageAltsArr[imageCounter]}"`);
						imageCounter++;
						i += 3;
					}
				}
			}
		imageAltsArr.forEach((item, index) => {
			if (item) body[`alt${index + 1}`] = item;
		});

		body.description = body.description.join("");

		if (postAction === BLOG_ACTION.CREATE) {
			const paragraphsToReplaceRegex =
				/<p class="MsoNormal">&#160;<\/p>|<p class="MsoNormal"><b><span>&#160;<\/span><\/b><\/p>/g;
			body.description = description.replace(paragraphsToReplaceRegex, "<div><br></div>");

			this.blogService
				.createBlog(body)
				.pipe(
					this.hotToastService.observe({
						loading: "Post creating...",
						success: "Post created successfully!",
						error: "Post creation failed!",
					})
				)
				.subscribe((data: any) => {
					this.blogService
						.uploadImage(this.getFormData({ image }), data._id)
						.pipe(
							this.hotToastService.observe({
								loading: "Uploading images...",
								success: "Images uploaded successfully!",
								error: "Images uploading failed!",
							})
						)
						.subscribe(() => this.router.navigate(["/admin/blog"]));
				});
		} else {
			forkJoin([
				this.blogService.updateBlog(_id, body).pipe(first()),
				this.blogService.uploadImage(this.getFormData({ image }), _id).pipe(first()),
			])
				.pipe(
					this.hotToastService.observe({
						loading: "Post updating...",
						success: "Post updated successfully!",
						error: "Post updating failed!",
					})
				)
				.subscribe(() => this.router.navigate(["/admin/blog"]));
		}
	}

	private getFormData(data: any): any {
		const formData = new FormData();

		Object.entries(data)
			.filter(([, value]) => !!value)
			.forEach(([key, value]: [string, any]) => {
				if (key === "image") {
					Array.from(value).forEach((file: any) => {
						formData.append(key, file);
					});
				} else if (Array.isArray(value)) {
					value
						.filter((arrayItem) => !!arrayItem)
						.forEach((arrayItem) => {
							formData.append(key, arrayItem);
						});
				} else if (typeof value === "object" && value) {
					for (const childKey in value) {
						const fullKey = `${key}${capitalizeFirstLetter(childKey)}`;
						formData.append(fullKey, value[childKey]);
					}
				} else {
					formData.append(key, value);
				}
			});

		return formData;
	}
}
