import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter, forwardRef,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	ViewChild,
} from "@angular/core";
import {ControlValueAccessor, FormBuilder} from "@ngneat/reactive-forms";
import { BehaviorSubject, Observable } from "rxjs";
import { CategoriesDialogComponent } from "../../../../../../../../../libs/shared/components/categories-dialog/layout/categories-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { SlideInOutAnimation } from "../../shared/animations/slide-in-out.animation";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { InitialCategoryState } from "../../shared/models/initial-category-state.model";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
	selector: "b2b-client-marketplace-filters-mobile",
	templateUrl: "./client-marketplace-filters-mobile.component.html",
	styleUrls: ["./client-marketplace-filters-mobile.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [SlideInOutAnimation],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ClientMarketplaceFiltersMobileComponent),
			multi: true,
		}
	]
})
export class ClientMarketplaceFiltersMobileComponent implements OnChanges, AfterViewInit, ControlValueAccessor {
	@Input() animationState: "in" | "out";
	@Input() initialCategoryState: InitialCategoryState;

	@Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
	@Output() filterEvent: EventEmitter<any> = new EventEmitter<any>();
	@Output() filtersPlaceholder: EventEmitter<string> = new EventEmitter<string>();

	@ViewChild("backdrop", { static: true }) backdrop?: ElementRef;

	public form = this.formBuilder.group({
		"categories[]": [[]],
		"country": [null],
		"type": [null],
	});

	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	onChange: any = () => {};
	onTouched: any = () => {};

	private isCountrySelectOpenSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private formBuilder: FormBuilder
	) {}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes?.initialCategoryState?.currentValue?.name) {
			this.form.patchValue({ "categories[]": this.initialCategoryState._id });
			this.updateFiltersPlaceholder(this.form.value);
		}
	}

	public ngAfterViewInit(): void {
		this.initTrackingBackdropClick();
	}

	public get isCountrySelectOpen$(): Observable<boolean> {
		return this.isCountrySelectOpenSource.asObservable();
	}

	public closeCountrySelect(): void {
		this.isCountrySelectOpenSource.next(false);
	}

	public openCountrySelect(): void {
		this.isCountrySelectOpenSource.next(true);
	}

	public toggleShowPopUp(): void {
		this.closePopUp.emit();
	}

	public clearFilters(): void {
		this.form.reset();
		this.filterEvent.emit({});
		this.onChange({})
		this.closePopUp.emit();
		this.filtersPlaceholder.emit("All");
	}

	public applyFilters(): void {
		const valueForEmit = {};
		const value = this.form.value;
		this.onChange(value);
		this.updateFiltersPlaceholder(value);
		this.filterEvent.emit(valueForEmit);
		this.closePopUp.emit();
	}

	private updateFiltersPlaceholder(formFilters: any): void {
		let placeholder = "";
		for (const key in formFilters) {
			if (formFilters[key] !== null) {
				if (Array.isArray(formFilters[key]) && !formFilters[key].length) {
					continue;
				}
				placeholder += this.getLabelByFormControlName(key) + ", ";
			}
		}
		this.filtersPlaceholder.emit(placeholder + "...");
	}

	private initTrackingBackdropClick(): void {
		if (this.backdrop) {
			this.backdrop.nativeElement.addEventListener("click", (e: MouseEvent) => {
				if (e.target === this.backdrop.nativeElement) {
					this.toggleShowPopUp();
					this.changeDetectorRef.markForCheck();
				}
			});
		}
	}

	private getLabelByFormControlName(filter: string): string {
		const obj: any = {
			"categories[]": "Category",
			"country": "Country",
			"type": "Type",
		};

		if (!obj[filter]) {
			return "";
		}

		return obj[filter];
	}

	writeValue(value: any): void {
		this.form.patchValue(value);
		this.updateFiltersPlaceholder(value);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
}
