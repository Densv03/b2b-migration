import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { FormBuilder, FormGroup } from "@ngneat/reactive-forms";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientMarketplaceService } from "../../client-marketplace.service";
import { Observable } from "rxjs";
import { UserService } from "../../../client-profile/services/user/user.service";
import SwiperCore, { Navigation, Pagination, Swiper } from "swiper";
import { CategoriesService } from "../../../../services/categories/categories.service";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { AuthService } from "../../../../../auth/services/auth/auth.service";
import {filter, map, switchMap} from "rxjs/operators";
import { CategoryListingService } from "../../pages/category-listing/category-listing.service";
import { Category } from "../../shared/models/category.model";
import { animate, style, transition, trigger } from "@angular/animations";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

SwiperCore.use([Pagination, Navigation]);

const breakpoints = {
	320: {
		spaceBetween: 1,
		slidesPerView: 1,
		slidesPerGroup: 1,
	},
	480: {
		spaceBetween: 30,
		slidesPerView: 2,
		slidesPerGroup: 2,
	},
	768: {
		slidesPerView: 3,
		spaceBetween: 30,
		slidesPerGroup: 3,
		allowTouchMove: true,
	},
	1024: {
		slidesPerView: 4,
		spaceBetween: 30,
		slidesPerGroup: 3,
	},
};

@UntilDestroy()
@Component({
	selector: "b2b-client-marketplace-main",
	templateUrl: "./client-marketplace-main.component.html",
	styleUrls: ["./client-marketplace-main.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger("fadeAnimation", [
			transition(":enter", [style({ height: 0, opacity: 0 }), animate("300ms", style({ height: 20, opacity: 1 }))]),
			transition(":leave", [style({ height: 1, opacity: 1 }), animate("300ms", style({ height: 0, opacity: 0 }))]),
		]),
	],
})
export class ClientMarketplaceMainComponent implements OnInit {
	public formGroup: FormGroup = this.fb.group({
		q: [null],
		'categories[]': [null],
		level1Category: [null],
		level2Category: [null],
	});
	public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	public categoriesSource$: Observable<Category[]> = this.categoryListingService.presentCategoriesSource$;
	public readonly offersSkeletonOptions: any;
	public readonly user$: Observable<any>;

	public readonly level1Categories$: Observable<any[]> = this.getLevel1Categories$();
	public readonly level2Categories$: Observable<any[]> = this.getLevel2Categories$();


	public isAuth$: Observable<boolean>;

	private swiper: Swiper;
	constructor(
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private readonly usersService: UserService,
		private readonly renderer: Renderer2,
		private readonly elementRef: ElementRef,
		private readonly clientMarketService: ClientMarketplaceService,
		private readonly route: ActivatedRoute,
		private readonly categoriesService: CategoriesService,
		private readonly authService: AuthService,
		private readonly categoryListingService: CategoryListingService,

	) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.user$ = this.usersService.getUser$();
		this.offersSkeletonOptions = this.getOffersSkeletonOptions();
		this.isAuth$ = this.authService.user$.pipe(map((user) => !!user));
	}

	public ngOnInit(): void {
		this.initializeSwiper();
		this.initCategoryReset();
	}

	public onSubmit(): void {
		const queryParams = {
			page: 1
		};
		if (this.formGroup.value.level1Category || this.formGroup.value.level2Category) {
			queryParams['categories[]'] = this.formGroup.value.level2Category ?? this.formGroup.value.level1Category;
		} else if (this.formGroup.value.q) {
			queryParams['q'] = this.formGroup.value.q;
		}
		this.router.navigate(["listing"], {
			relativeTo: this.route,
			queryParams,
		});
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

	public goToListing(_id: string): void {
		this.router.navigate(["listing"], {
			relativeTo: this.route,
			queryParams: { 'categories[]': _id },
		});
	}

	private initializeSwiper(): void {
		this.categoriesSource$
			.pipe(
				untilDestroyed(this),
				filter((data) => data.length !== 0)
			)
			.subscribe(() => {
				this.swiper = new Swiper(".swiper", {
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
					pagination: {
						el: ".swiper-pagination",
						dynamicBullets: true,
						clickable: true,
					},
					breakpoints,
				});
			});
	}

	public resetForm(): void {
		this.formGroup.reset();
	}

	private getLevel1Categories$() {
		return this.categoriesService
			.getCategories()
			.pipe(map(({ categories }) => categories.filter((category) => category.children.length)));
	}

	private getLevel2Categories$() {
		return this.formGroup.getControl("level1Category").valueChanges.pipe(
			switchMap((id) => {
				return this.categoriesService
					.getCategories()
					.pipe(map(({ categories }) => categories.find((foundCategory) => foundCategory._id === id)?.children));
			})
		);
	}

	private initCategoryReset(): void {
		this.formGroup
			.get("level1Category")
			.valueChanges.pipe(
			filter((data) => !!data),
			untilDestroyed(this)
		)
			.subscribe(() => {
				this.formGroup.get("level2Category").setValue(null);
			});
	}
}