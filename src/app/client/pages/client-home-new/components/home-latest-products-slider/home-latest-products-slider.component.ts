import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import {getName} from 'country-list'
import {Navigation, Pagination} from "swiper/modules";


const breakpoints = {
	320: {
		spaceBetween: 1,
		slidesPerView: 1.5,
		slidesPerGroup: 1,
	},
	600: {
		spaceBetween: 25,
		slidesPerView: 2.2,
		slidesPerGroup: 2,
	},
	680: {
		spaceBetween: 25,
		slidesPerView: 2.5,
		slidesPerGroup: 2,
	},
	820: {
		slidesPerView: 3,
		spaceBetween: 25,
		slidesPerGroup: 3,
		allowTouchMove: true,
	},
	1300: {
		slidesPerView: 4,
		spaceBetween: 25,
		slidesPerGroup: 3,
	},
};

interface NavigationButtonsIds {
	nextId: string,
	prevId: string
}
@Component({
  selector: 'b2b-home-latest-products-slider',
  templateUrl: './home-latest-products-slider.component.html',
  styleUrls: ['./home-latest-products-slider.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLatestProductsSliderComponent implements AfterViewInit {
	@Input() navigationButtonsIds!: NavigationButtonsIds;
	@Input() items: any;
  @ViewChild('swiperRef', { static: true }) _swiperRef: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    const {nextId, prevId} = this.navigationButtonsIds;
    const swiperConfig = {
      modules: [Navigation, Pagination],
      navigation: {
        nextEl: "#" + nextId,
        prevEl: "#" + prevId,
      },
      injectStyles: [
        `
        .swiper-wrapper {
          padding: 5px 0;
        }
        `
      ],
      breakpoints,
    }

    Object.assign(this._swiperRef.nativeElement, swiperConfig);
    this._swiperRef.nativeElement.initialize();
  }

  public getCountryName(countryCode: string): string {
		if (!countryCode) {
			return "";
		}
		return getName(countryCode);
	}

	public cutString(name: string, wordsToSlice: number = 2): string {
		if	(!name) return '';
		const splittedName = name.split(' ');
		if	(splittedName.length > 2) {
			return splittedName.slice(0, wordsToSlice).join(' ') + '...'
		} return name
	}

}
