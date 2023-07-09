import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Inject,
	OnDestroy,
	OnInit,
	Renderer2
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {HotToastService} from "@ngneat/hot-toast";
import {FormBuilder, FormGroup} from "@ngneat/reactive-forms";
import {AuthService} from "apps/site/src/app/auth/services/auth/auth.service";
import {AmplitudeService} from "apps/site/src/app/core/services/amplitude/amplitude.service";
import {Observable, Subject} from "rxjs";
import {first, map, switchMap} from "rxjs/operators";
import {BlogService} from "../../../services/blog/blog.service";
import {DOCUMENT} from "@angular/common";
import {SeoService} from "../../../../core/services/seo/seo.service";

@Component({
	selector: "b2b-client-blog-article",
	templateUrl: "./client-blog-article.component.html",
	styleUrls: ["./client-blog-article.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientBlogArticleComponent implements AfterViewInit, OnDestroy {
	public readonly offers$: Observable<any>;
	public readonly socialMedias: any;
	public readonly tradingWikiOptions: any;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	public readonly article$: Observable<any>;

	public readonly formGroup: FormGroup;

	public comments$: Observable<any>;

	public getNewComments: Subject<any>;


	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _blogService: BlogService,
		private readonly _formBuilder: FormBuilder,
		private readonly _hotToastService: HotToastService,
		private readonly _ampService: AmplitudeService,
		private readonly _authService: AuthService,
		private readonly _router: Router,
		private readonly changeDetectorRef: ChangeDetectorRef,
		@Inject(DOCUMENT) private readonly _document: Document,
		private renderer2: Renderer2,
		private readonly seoService: SeoService
	) {
		this.getNewComments = new Subject();
		this.socialMedias = this.getSocialMedias();
		this.tradingWikiOptions = [];
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

		this.article$ = this.getArticle$();

		this.formGroup = this._formBuilder.group({
			text: "",
		});

	}

	ngAfterViewInit() {
		this.getArticle$().pipe(
			first()
		).subscribe(({blog: {_id, createdAt, updatedAt, title}}) => {
			this.comments$ = this.getComments(_id);
			this.changeDetectorRef.markForCheck();
			this.addSubscriptionForm();
			this.seoService
				.addBlogMicroMarkup(this._document, window.location.href, title, new Date(createdAt), new Date(updatedAt));
		});
	}

	public getComments(id: string): Observable<any> {
		return this._blogService.getComments(id)
	}

	public createComment(articleId, formGroup): void {
		if (!this._authService.getToken()) {
			this._router.navigateByUrl("auth/register-credentials");
			return;
		}

		if (!formGroup.text) {
			return;
		}

		this._blogService
			.createComment(articleId, formGroup.text)
			.pipe(
				this._hotToastService.observe({
					loading: "Comment creating...",
					success: "Comment created successfully!",
					error: "You have to be authorized",
				})
			)
			.subscribe(() => this.getNewComments.next(true));

		this.formGroup.reset();
	}

	public getSocialMedias() {
		return [
			{
				icon: "facebook",
				href: "https://www.facebook.com/",
				share: "facebook",
			},
			{
				icon: "linkedin",
				href: "https://www.linkedin.com/",
				share: "linkedin",
			},
		];
	}

	public getArticle$(): Observable<any> {
		return this._activatedRoute.paramMap.pipe(
			map((paramMap) => paramMap.get("id")),
			switchMap((id) => this._blogService.getArticleById(id))
		);
	}

	public processShareBtn(shareName): void {
		this._ampService.logEvent("Click on share button", {
			type: shareName,
		});
	}

	private addSubscriptionForm(): void {
		const script = this.renderer2.createElement('script');
		script.async = true;
		script.src = "https://pop-ups.sendpulse.com/assets/loader.js";
		script.setAttribute("data-chats-widget-id", "640279e7-7070-4008-93fd-9c9d2c7d5618");
		this._document.body.appendChild(script);
	}


	ngOnDestroy() {
		this._document.querySelector("[data-chats-widget-id]").remove();
		this._document.querySelector("[id='micro-markup']").remove();
	}
}
