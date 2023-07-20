import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	forwardRef,
	Injectable,
	Input,
	OnChanges,
} from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";
import { TranslocoService } from "@ngneat/transloco";

// import { DefaultTreeviewI18n, TreeviewConfig, TreeviewI18n, TreeviewItem, TreeviewSelection } from "";
import { DefaultTreeviewI18n, TreeviewI18n } from "../models/treeview-i18n";
import { TreeviewConfig } from "../models/treeview-config";
import { NgxChanges } from "projects/shared/src/interfaces/on-changes.interface";
import { B2bNgxSelectThemeEnum } from "dist/ngx-select";
import { TreeviewSelection, TreeviewItem } from "../models/treeview-item";

@Injectable()
export class CategoriesTreeviewI18n extends DefaultTreeviewI18n {
	constructor(private readonly _translocoService: TranslocoService) {
		super();
	}

	override getText(selection: TreeviewSelection): string {
		if (selection.uncheckedItems.length === 0) {
			return "INPUTS.ALL_CATEGORIES";
		}

		switch (selection.checkedItems.length) {
			case 0:
				return this._translocoService.translate("INPUTS.SELECT_CATEGORIES");
			case 1:
				return selection.checkedItems[0].text;
			default:
				return `${selection.checkedItems.length} categories selected`;
		}
	}
}

@Component({
	selector: "b2b-ngx-treeview",
	templateUrl: "./ngx-treeview.component.html",
	styleUrls: ["./ngx-treeview.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => B2bNgxTreeviewComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => B2bNgxTreeviewComponent),
			multi: true,
		},
		{ provide: TreeviewI18n, useClass: CategoriesTreeviewI18n },
	],
})
export class B2bNgxTreeviewComponent implements OnChanges, ControlValueAccessor {
	@Input() config: TreeviewConfig;
	@Input() items: any;
	@Input() position: "left" | "right";
	@Input() label: string;
	@Input() theme: string;
	@Input() buttonName: string;

	public readonly formControl: FormControl<string>;

	private onChange: (value: string[]) => void;
	private onTouched: () => void;

	public itemsToDisplay: TreeviewItem[];
	public isClicked = false;

	constructor(private changeDetectorRef: ChangeDetectorRef) {
		this.config = TreeviewConfig.create({
			hasAllCheckBox: false,
			hasFilter: true,
			hasCollapseExpand: false,
			decoupleChildFromParent: false,
			maxHeight: 400,
		});

		this.onChange = () => null;
		this.onTouched = () => null;

		this.formControl = new FormControl<string>('');
	}

	public close(): void {
		const [dropdown] = document.getElementsByClassName("dropdown") as any;
		const [dropdownMenu] = document.getElementsByClassName("dropdown-menu") as any;
		const [dropdownToggle] = document.getElementsByClassName("dropdown-toggle") as any;

		dropdown.classList.remove("show");
		dropdownMenu.classList.remove("show");
		dropdownToggle.setAttribute("aria-expanded", false);
	}

	public emitChanges(value: string[]): void {
		const rootCategoriesIds: any[] = [];
		this.items.forEach((itemLevelOne: any) => {
			let itemLevelTwo: any = undefined;

			if (itemLevelOne?.children) {
				itemLevelOne.children.forEach((_itemLevelTwo: any) => {
					const itemLevelThreeExist = _itemLevelTwo.children?.find((el: any) => value.includes(el.value));

					if (itemLevelThreeExist) {
						rootCategoriesIds.push(_itemLevelTwo.value);
						itemLevelTwo = _itemLevelTwo;
					}
				});
			}
			if (itemLevelTwo) {
				const currentItemOneChildren = itemLevelOne.children.find((el: any) => el.value === itemLevelTwo.value);
				if (currentItemOneChildren) {
					rootCategoriesIds.push(itemLevelOne.value);
				}
			}
		});

		this.onChange([...value, ...new Set(rootCategoriesIds)] as any);
	}

	ngOnChanges(changes: NgxChanges<B2bNgxTreeviewComponent>): void {
		if (!changes.items) {
			return;
		}
		this.itemsToDisplay = changes.items.currentValue.map((item: any) => new TreeviewItem(item));

		this.setItemsToDisplay();
	}

	public setItemsToDisplay() {
		this.setSelected(this.items, this.formControl.value);

		this.itemsToDisplay = this.items.map((item: any) => new TreeviewItem(item));

		this.changeDetectorRef.detectChanges();
	}

	public validate(): ValidationErrors {
		return this.formControl.errors;
	}

	public registerOnChange(fn: (value: string[]) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setSelected(items: any[], selected: any) {
		items.forEach((item) => {
			if (selected && selected.includes(item.value)) {
				item.checked = true;
			}
			if (item.children) {
				this.setSelected(item.children, selected);
			}
		});
	}

	public writeValue(value: string): void {
		this.formControl.setValue(value);

		this.setItemsToDisplay();
	}

	public setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.formControl.disable() : this.formControl.enable();
	}
}
