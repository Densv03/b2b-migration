import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	ViewChild
} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'b2b-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownComponent {
	@ViewChild('counterLimit', {static: true}) counterLimitRef?: ElementRef;
	@ViewChild('amountOfDays', {static: true}) amountOfDaysRef?: ElementRef;
	@ViewChild('counterSection', {static: true}) counterSectionRef?: ElementRef;

	private percentageCounterSource: BehaviorSubject<number> = new BehaviorSubject<number>(1);
	private daysCounterSource: BehaviorSubject<number> = new BehaviorSubject<number>(1);
	private wasCounterLaunchedSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private countLimitSource: BehaviorSubject<number> = new BehaviorSubject<number>(1);
	private amountOfDaysSource: BehaviorSubject<number> = new BehaviorSubject<number>(1);

	public get counter$(): Observable<number> {
		return this.percentageCounterSource.asObservable();
	}

	public get days$(): Observable<number> {
		return this.daysCounterSource.asObservable();
	}

	public get countLimit$(): Observable<number> {
		return this.countLimitSource.asObservable()
	}

	public get amountOfDays$(): Observable<number> {
		return this.amountOfDaysSource.asObservable();
	}

	private countAmountOfDays(): number {
		const startDate = new Date(Date.now()).getTime();
		const endDate = new Date('06/30/2023').getTime();
		return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
	}

	private getCountLimit(): number {
		return 90 * this.countAmountOfDays() / 85;
	}

	private initPercentageCounterObserve(): void {
		this.countLimitSource.next(this.getCountLimit());

		const observer = new MutationObserver(() => {
			this.percentageCounterSource.next(+this.counterLimitRef!.nativeElement.textContent)
		});
		observer.observe(this.counterLimitRef?.nativeElement, {
			childList: true,
		});
	}

	private initDaysCounterObserve(): void {
		this.amountOfDaysSource.next(this.countAmountOfDays());

		const observer = new MutationObserver(() => {
			this.daysCounterSource.next(+this.amountOfDaysRef!.nativeElement.textContent)
		});
		observer.observe(this.amountOfDaysRef?.nativeElement, {
			childList: true,
		});
	}

	@HostListener('window:scroll', ['$event'])
	private onScroll(): void {
		// if (!this.wasCounterLaunchedSource.getValue() && this.isInViewport(this.counterSectionRef?.nativeElement)) {
			this.wasCounterLaunchedSource.next(true);
			this.initDaysCounterObserve();
			this.initPercentageCounterObserve();
		// }
	}

	private isInViewport(element: HTMLElement) {
		if (!element) {
			return;
		}

		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}
}
