import {ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild,} from "@angular/core";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {B2bNgxLinkThemeEnum} from "@b2b/ngx-link";
import {BehaviorSubject, Observable} from "rxjs";
import {filter, first, map} from "rxjs/operators";
import {CategoryListingService} from "../../client-marketplace/pages/category-listing/category-listing.service";
import {Category} from "../../client-marketplace/shared/models/category.model";
import {AuthService} from "../../../../auth/services/auth/auth.service";
import {TranslocoService} from "@ngneat/transloco";
import {ActivatedRoute} from "@angular/router";

@Component({
	selector: "b2b-client-market-promo",
	templateUrl: "./client-market-promo.component.html",
	styleUrls: ["./client-market-promo.component.scss"],
})
export class ClientMarketPromoComponent implements OnInit {
  public lang: string;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;

	private categoriesNamesSource: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

	@ViewChild("circle", {static: true}) circle?: ElementRef;
	@Input() limitDeg: number = 360;
	@Input() value: number = 0;
	@Input() width: number = 7;
	private readonly INTERNAL_SIZE = 100;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private readonly categoriesListingService: CategoryListingService,
		private readonly authService: AuthService,
		private readonly translocoService: TranslocoService,
		private readonly activatedRoute: ActivatedRoute
	) {
	}

	public ngOnInit() {
		if (this.activatedRoute.snapshot.params?.['lang']) {
      this.lang = this.activatedRoute.snapshot.params['lang'];
			this.translocoService.setActiveLang(this.activatedRoute.snapshot.params?.['lang']);
		}
		this.categoriesListingService.presentCategoriesSource$
			.pipe(
				filter((data) => !!data.length),
				first()
			)
			.subscribe((data) => {
				this.categoriesNamesSource.next(this.getCategoryNamesArr(data));
			});
	}

	public get isAuth$(): Observable<boolean> {
		return this.authService.user$.pipe(map((user) => !!user));
	}

	get radius(): number {
		return (this.INTERNAL_SIZE - this.width) / 2;
	}

	get circleLength(): number {
		return 2 * Math.PI * this.radius;
	}

	@HostListener("document:scroll", ["$event"])
	public onViewportScroll() {
		const windowHeight = window.innerHeight;
		const boundingRectFive = this.circle?.nativeElement.getBoundingClientRect();

		if (boundingRectFive?.top >= 0 && boundingRectFive?.bottom <= windowHeight) {
			setTimeout(() => {
				this.value = this.getDaysToEndDate() / 100;
				this.changeDetectorRef.detectChanges();
			}, 100);
		}
	}

	public getDaysToEndDate(): number {
		const startDate = new Date(Date.now()).getTime();
		const endDate = new Date("08/31/2023").getTime();
		const percent = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
		return percent;
	}

	public getStrokeOffset(): number {
		return (1 - this.value) * this.circleLength;
	}

	get categoriesNamesSource$(): Observable<string[]> {
		return this.categoriesNamesSource.asObservable();
	}

	public smoothScrollToAdvantages(): void {
		const advantagesElement = document.getElementById("ts-advantages");
		advantagesElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
	}

	private getCategoryNamesArr(categories: Category[]): string[] {
		return categories.reduce((accum, currentValue) => {
			const temp = currentValue.children.map((node) => node.name);
			return [...accum, ...temp];
		}, []);
	}
}
