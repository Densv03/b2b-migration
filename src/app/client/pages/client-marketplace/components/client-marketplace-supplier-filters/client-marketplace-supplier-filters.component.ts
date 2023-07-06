import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@ngneat/reactive-forms";
import { CategoriesDialogComponent } from "../../../../../../../../../libs/shared/components/categories-dialog/layout/categories-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Observable } from "rxjs";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";

@Component({
	selector: "b2b-client-marketplace-supplier-filters",
	templateUrl: "./client-marketplace-supplier-filters.component.html",
	styleUrls: ["./client-marketplace-supplier-filters.component.scss"],
})
export class ClientMarketplaceSupplierFiltersComponent implements OnInit {
	@Output() filterEvent: EventEmitter<any> = new EventEmitter<any>();

	public form: FormGroup;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	constructor(private fb: FormBuilder, private dialog: MatDialog) {
		this.form = this.fb.group({ productCategories: [] });
	}

	ngOnInit(): void {
		this.form.valueChanges.subscribe((value) => {
			const valueForEmit = {};
			for (const key in value) {
				if (Array.isArray(value[key]) && value[key].length) {
					valueForEmit[key] = value[key];
				} else if (value[key] && !Array.isArray(value[key])) {
					valueForEmit[key] = value[key];
				}
			}
			this.filterEvent.emit(valueForEmit);
		});
	}

	public resetForm(): void {
		this.form.reset();
	}
}
