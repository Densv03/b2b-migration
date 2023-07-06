import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {B2bNgxLinkService, B2bNgxLinkThemeEnum} from "@b2b/ngx-link";
import {OffersService} from "../../../services/offers/offers.service";
import {UserService} from "../../client-profile/services/user/user.service";
import {AuthService} from "../../../../auth/services/auth/auth.service";
import {Router} from "@angular/router";
import {BlogService} from "../../../services/blog/blog.service";
import {map} from "rxjs/operators";
import {TradebidService} from "../../client-tradebid/tradebid.service";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";

import {SectionInfoEnum} from "../../client-about-us/section-info.enum";
import {CategoriesService} from "../../../services/categories/categories.service";

import {FormControl, Validators} from "@angular/forms";
import {environment} from "../../../../../environments/environment";
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import {HotToastService} from "@ngneat/hot-toast";
import {HomepageService} from "../../../shared/services/homepage/homepage.service";
import {untilDestroyed} from "@ngneat/until-destroy";
import SwiperCore from "swiper";
import Scrollbar from "swiper"

SwiperCore.use([Scrollbar]);

@Component({
	selector: "b2b-client-home",
	templateUrl: "./client-home.component.html",
	styleUrls: ["./client-home.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientHomeComponent implements OnInit {
	public hideBtn: boolean;
	// public readonly offers$: Observable<any[]>;
	public readonly offersSkeletonOptions: any;
	public readonly user$: Observable<any>;
	public readonly articles$: Observable<any[]>;
	public url = environment.apiUrl;
	public solutionsLink = "";
	public categories: any[] = [];
	public email = new FormControl('', Validators.required);
	public b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public selectedCategory = [];
	private readonly aboutUsVisibleSectionType: typeof SectionInfoEnum = SectionInfoEnum;

	constructor(
		private readonly _offersService: OffersService,
		private readonly _usersService: UserService,
		private readonly categoriesService: CategoriesService,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly _authService: AuthService,
		private readonly router: Router,
		private readonly homePageService: HomepageService,
		private readonly tradebidService: TradebidService,
		private readonly blogService: BlogService,
		private readonly hotToastService: HotToastService
	) {
		// this.offers$ = this.getOffers();
		this.user$ = this._usersService.getUser$();
		this.articles$ = this.getArticles();
		this.offersSkeletonOptions = this.getOffersSkeletonOptions();
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
		this._authService.user ? (this.hideBtn = true) : (this.hideBtn = false);
	}

	ngOnInit() {
		this.getCategories();
		this.solutionsLink = this.getSolutionsLink();
	}

	public getSolutionsLink(): string {
		return this._usersService.isAuth() ? "#solutions" : "/auth/log-in";
	}

	public redirect($event: MouseEvent, link: string): void {
		$event.stopPropagation();
		if (this.isAuth()) {
			this.router.navigate([link]).then(() => {
				window.location.reload();
			});
		} else {
			this.router.navigate(["/auth/register-credentials"]).then(() => {
				window.location.reload();
			});
		}
	}

	public subscribeOnCategories(): void {
		if (this.selectedCategory.length === 0 || this.email.invalid) {
			return;
		}
		const model: any = {
			categoriesId: this.selectedCategory,
			email: this.email.value
		};
		// this.homePageService.updateSubscription(model)
		// 	.pipe(untilDestroyed(this))
		// 	.subscribe(({message: string}) => {
    //     this.hotToastService.success(message.toUpperCase())
    //   });
	}

	public isAuth(): boolean {
		return this._usersService.isAuth();
	}

	public getOffersSkeletonOptions() {
		return [
			{
				count: 10,
				animation: "progress",
				theme: {
					height: "120px",
				},
			},
		];
	}

	public clickOnSection(e: MouseEvent, link: string, parentLink: string): void {
		(e.target as Element).classList.contains("b2b-ngx-link")
			? this.router.navigate([link])
			: this.router.navigate([parentLink]);
	}

	public getIndex(n: number): number {
		return n + 1;
	}

	public selectedCategories(event: Event, id: never = '' as never): void {
		if ((event.target as HTMLInputElement).checked && !this.selectedCategory.includes(id)) {
			this.selectedCategory.push(id);
		} else if (!(event.target as HTMLInputElement).checked && this.selectedCategory.includes(id)) {
			const index = this.selectedCategory.indexOf(id);
			this.selectedCategory.splice(index, 1);
		}
	}

	public smoothScrollToSolutions(): void {
		if (this.isAuth()) {
			const solutions = document.getElementById("solutions");
			solutions!.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
		} else {
			this.router.navigate(["/auth/register-credentials"]);
		}
	}

	public navigateOnAboutUs(): void {
		this.router.navigate(["/about-us"], {queryParams: {sectionType: this.aboutUsVisibleSectionType.cargo}});
	}

	private getArticles(): Observable<any[]> {
		return this.blogService.getArticles("?limit=3").pipe(map((item) => item.posts));
	}

	private getCategories(): void {
		this.categoriesService
			.getCategories()
			.pipe(untilDestroyed(this))
			.subscribe((el: any) => {
				this.categories = el.categories.map((category: any) => {
					return {value: category._id, text: category.name, icon: this.url + category.icon, checked: false};
				});
				if (this._usersService.getUser()) {
					this.email.setValue(this._usersService.getUser().email);
					// this.categories.map((category: any) => {
					// 	category.checked = this._usersService.getUser().preferences.includes(category.id);
					// 	if (category.checked && !this.selectedCategory.includes(category?.id)) {
					// 		this.selectedCategory.push(category?.id);
					// 	}
          //
					// });
				}
			});
	}
}
