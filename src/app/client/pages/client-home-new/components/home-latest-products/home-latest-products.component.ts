import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {filter, first} from "rxjs/operators";
import {Router} from "@angular/router";
import {HomepageService} from "../../../../shared/services/homepage/homepage.service";


@Component({
	selector: 'b2b-home-latest-products',
	templateUrl: './home-latest-products.component.html',
	styleUrls: ['./home-latest-products.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLatestProductsComponent {
	public data: any[] = [];

	constructor(private readonly homePageService: HomepageService,
							private readonly cdr: ChangeDetectorRef) {
		this.getCarouselItems();
	}

	private getCarouselItems(): void {
		this.homePageService.getCarouselItems()
			.pipe(
				filter(data => !!data),
				first())
			.subscribe((data: any) => {
				this.data = data;
				this.cdr.markForCheck();
			})
	}
}
