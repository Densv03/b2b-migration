import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {UserService} from "../../../../../client-profile/services/user/user.service";
import {Observable} from "rxjs";

@Component({
	selector: 'b2b-companies-counter',
	templateUrl: './companies-counter.component.html',
	styleUrls: ['./companies-counter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesCounterComponent implements AfterViewInit {

	@ViewChild('counter', {static: true}) public readonly counterEl: ElementRef;
	@Input() userIsLogged: boolean;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	public totalUsersCount$: Observable<number> = this.userService.getTotalUsersAmount();

	constructor(private readonly userService: UserService) {
	}

	ngAfterViewInit(): void {
		const ready = (selector, callback) => {
			const elems = [document.querySelector(selector)];
			if (elems.length) {
				for (const elem of elems) {
					callback(elem);
				}
			}
		};

		this.totalUsersCount$.subscribe(() => {
			ready('.counter', (stat) => {
				setTimeout(() => {
					const patt = /(\D+)?(\d+)(\D+)?(\d+)?(\D+)?/;
					const time = 500;
					let result = [...patt.exec(this.counterEl.nativeElement.innerText)];
					let fresh = true;

					// Remove first full match from result array (we don`t need the full match, just the individual match groups).
					result.shift();
					// Remove undefined values from result array where they did not have a match in one of the optional regex groups
					result = result.filter(res => !!res);

					while (stat.firstChild) {
						stat.removeChild(stat.firstChild);
					}
					const res = result[0]
					// for (const res of result) {
					if (isNaN(+res)) {
						stat.insertAdjacentHTML('beforeend', `<div class="parent-span">${res}</div>`);
					} else {
						for (let i = 0; i < res.length; i++) {
							const oneMoreThanCurrent = parseInt(res[i]) === 9 ? 0 : +res[i] + 1;
							const oneLessThanPrev = parseInt(res[i]) === 0 ? 9 : +res[i] - 1;
							stat.insertAdjacentHTML('beforeend',
								`
						<div class="parent-span" data-value="${res[i]}">
							<div class="child-span">&ndash;</div>
							${Array(parseInt(res[i]) + 1).join('0').split('0').map((x, j) => `
								${j == parseInt(res[i]) ?

									`<div class="child-span current-value">${j}</div>` :
									j == oneLessThanPrev ?

										`<div class="child-span gray">${j}</div>` : `<div class="child-span">${j}</div>`
								}`).join('')
								}
							<div class="child-span gray">${parseInt(res[i]) + 1 == 10 ? 0 : parseInt(res[i]) + 1}</div>
					  </div>`
							);
						}
					}
					// }
					//
					const ticks = [...stat.querySelectorAll('div[data-value]')];

					const activate = () => {
						const top = stat.getBoundingClientRect().top;
						const offset = (window.innerHeight * 3 / 4);

						setTimeout(() => {
							fresh = false;
						}, time);

						// if (top < offset) {
						setTimeout(() => {
							for (const tick of ticks) {
								const dist = parseInt(tick.getAttribute('data-value')) + 1;
								tick.style.transform = `translateY(-${(dist) * 100 + 20}%)`
							}
						}, fresh ? time : 0);
						window.removeEventListener('scroll', activate);
						// }
					}
					activate();
				}, )

			});
		})

		// ready check helper function (waits for the dom to load, then returns the indivudual elements one at a time - in case there are more than one of them on the page). I generally use this for all of my dom manipulating scripts so I dont have to type DOMContentLoaded and elems.forEach a hundred times

	}

}


