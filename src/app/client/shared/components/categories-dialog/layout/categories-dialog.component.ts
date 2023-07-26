import {ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {CategoriesPopupComponent} from "../categories-popup-component/categories-popup.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors} from "@angular/forms";
import {BehaviorSubject, filter, Observable} from "rxjs";
import {first} from "rxjs/operators";
import {B2bNgxSelectThemeEnum} from "@b2b/ngx-select";
import {CategoriesService} from "../../../../services/categories/categories.service";

@Component({
	selector: "b2b-categories-dialog",
	templateUrl: "./categories-dialog.component.html",
	styleUrls: ["./categories-dialog.component.scss"],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CategoriesDialogComponent),
			multi: true
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesDialogComponent implements ControlValueAccessor {
  @Output() categoryName = new EventEmitter<string>();
	@Input() required?: boolean;
	@Input() multiple?: boolean;
	@Input() theme: B2bNgxSelectThemeEnum;
	@Input() disableClose?: boolean;
	@Input() placeholder: string = 'Product categories';
	@Input() touched?: boolean;
	@Input() controlIsValid: boolean;
	@Input() errors: ValidationErrors;

	private categoriesPlaceholderSource: BehaviorSubject<string> = new BehaviorSubject<string>('');
	private lastValue: string[] = [];

	constructor(
		private dialog: MatDialog,
		private categoriesService: CategoriesService,
	) {
	}

	public get categoriesPlaceholder$(): Observable<string> {
		return this.categoriesPlaceholderSource.asObservable();
	}

	public writeValue(value: any): void {
		if (value === null || !value) {
			this.categoriesPlaceholderSource.next(this.placeholder);
			this.lastValue = [];
		} else if (typeof value === 'string') {
			this.updateCategoriesPlaceholder([value]);
			this.lastValue = [value];
		} else if (value.length) {
			this.updateCategoriesPlaceholder(value[0]);
			this.lastValue = value;
		} else if (!value.length || !this.categoriesPlaceholderSource.getValue()) {
			this.categoriesPlaceholderSource.next(this.placeholder);
		}
	}

	public onChange?: (value: any) => void;
	public onTouched?: () => void;

	public registerOnChange(fn: (value: any) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public openCategoriesDialog(): void {
		this.dialog.open(CategoriesPopupComponent, {
			disableClose: this.disableClose,
			data: {
				selectedCategories: this.lastValue,
				required: this.required,
				multiple: this.multiple,
			}
		})
			.afterClosed()
			.subscribe(categoriesList => {
				if (categoriesList.categories.length) {
					this.categoriesPlaceholderSource.next(`${categoriesList.placeholder.join(", ")}...`);
					this.lastValue = categoriesList.categories.map((category: { value: any; }) => category.value);
					this.onChange(categoriesList.categories.map((category: { value: any; }) => category.value));
				} else {
					this.categoriesPlaceholderSource.next(this.placeholder);
					this.onChange([]);
					this.lastValue = [];
				}
			});
	}

	private updateCategoriesPlaceholder(value: any[]): void {
		if (typeof value === 'string') {
			this.categoriesService.getCategoryNameById(value).pipe(filter(data => !!data), first()).subscribe((categoryName: string) => {
				this.categoriesPlaceholderSource.next(categoryName);
        this.categoryName.emit(categoryName);
			})
		} else if (Array.isArray(value)) {
			this.categoriesService.getCategoryNameById(value[0]).pipe(filter(data => !!data), first()).subscribe((categoryName: string) => {
				this.categoriesPlaceholderSource.next(categoryName);
        this.categoryName.emit(categoryName);
			})
		}
	}
}
