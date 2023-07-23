import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from "rxjs/operators";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";
import { CategoriesService } from "../../../../client/services/categories/categories.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { WikiService } from "../../../../client/services/wiki/wiki.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { HotToastService } from "@ngneat/hot-toast";
import { ActivatedRoute } from "@angular/router";
import {combineLatest, Observable} from "rxjs";
import { capitalizeFirstLetter } from "../../../../core/helpers/function/capitalize-first-letter";
import { animate, style, transition, trigger } from "@angular/animations";
import {AngularEditorConfig} from "@kolkov/angular-editor";

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

function setValuesToFormData(formData: FormData, values: any, prefix?: string) {
	Object.entries(values).forEach(([key, value]: any) => {
		if (Array.isArray(value)) {
			value
				.filter((arrayItem) => !!arrayItem)
				.forEach((arrayItem) => {
					formData.append(key, arrayItem);
				});
		} else if (key === "image") {
			Array.from(value).forEach((file: any) => {
				formData.append(key, file);
			});
		} else if (typeof value === "object" && value !== null) {
			setValuesToFormData(formData, value, key);
		} else {
			const displayKey = prefix ? `${prefix}${capitalizeFirstLetter(key)}` : key;
			formData.append(displayKey, value);
		}
	});
}

@UntilDestroy()
@Component({
	selector: "b2b-admin-article",
	templateUrl: "./admin-article.component.html",
	styleUrls: ["./admin-article.component.scss"],
	animations: [
		trigger("fadeInOut", [
			transition(":enter", [
				// :enter is alias to 'void => *'
				style({ opacity: 0 }),
				animate(500, style({ opacity: 1 })),
			]),
			transition(":leave", [
				// :leave is alias to '* => void'
				animate(500, style({ opacity: 0 })),
			]),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminArticleComponent implements OnInit {
	public readonly formGroup: FormGroup;
	public readonly editorConfig: AngularEditorConfig;
	public readonly b2bNgxSelectThemeEnum: typeof B2bNgxSelectThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	public level1Categories: any;
	public level2Categories: any;

	public readonly searchControl = new FormControl();
	public readonly searchedOptions$: Observable<any>;

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _categoriesService: CategoriesService,
		private readonly _wikiService: WikiService,
		private readonly _hotToastService: HotToastService,
		private readonly _activatedRoute: ActivatedRoute
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
			switchMap((search) => this._wikiService.getTags(search))
		);
	}

	public setSearch(search: any) {
		this.searchControl.setValue(search);
	}

	public setLevel1Categories() {
		this._categoriesService
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
		const articleById$ = this._activatedRoute.paramMap.pipe(
			map((paramMap) => paramMap.get("id")),
			filter((id) => !!id),
			switchMap((id) => this._wikiService.getArticleById(id))
		);

		const categories$ = this._categoriesService.getWikiCategories();

		combineLatest([articleById$, categories$])
			.pipe(untilDestroyed(this))
			.subscribe(([article, categories]) => {
				const level2CategoryId = article.category?._id;
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

	public getFormGroup() {
		return this._formBuilder.group({
			_id: null,
			title: ["", Validators.required],
			description: "",
			author: "",
			image: "",
			country: [null],
			tags: [[]],
			level1Category: [null],
			level2Category: [null],
		});
	}

	public onSubmit(values: { [x: string]: any; _id: any; level1Category: any; level2Category: any; tags: any; }): void {
		if (this.formGroup.status === "INVALID") {
			return;
		}
		const formData = new FormData();
		//
		const { _id, level1Category, level2Category, tags, ...rest } = values;

		const formValues: any = {
			...rest,
			category: level2Category ?? level1Category,
			tags: tags.map((tag: { _id: any; name: any; }) => tag._id || tag.name),
		};
		for (const key in formValues) {
			if (!formValues[key] || (Array.isArray(formValues[key]) && !formValues[key].length)) {
				delete formValues[key];
			}
		}

		formValues.image = formValues.image[0];

		if (_id) {
			// Array.isArray(formValues.image) ? delete formValues.image : null
			// setValuesToFormData(formData, formValues);

			this._wikiService
				.updateArticle(_id, formValues)
				.pipe(
					untilDestroyed(this),
					this._hotToastService.observe({
						loading: "Article updating...",
						success: "Article updated successfully!",
						error: "Article updating failed!",
					})
				)
				.subscribe(() => {});
		} else {
			setValuesToFormData(formData, formValues);
			this._wikiService
				.createArticle(formData)
				.pipe(
					untilDestroyed(this),
					this._hotToastService.observe({
						loading: "Article creating...",
						success: "Article created successfully!",
						error: "Article creation failed!",
					})
				)
				.subscribe(() => {});
		}
	}
}
