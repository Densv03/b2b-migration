import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import {FormGroup} from "@angular/forms";

@Component({
	selector: "b2b-client-marketplace-supplier-filters",
	templateUrl: "./client-marketplace-supplier-filters.component.html",
	styleUrls: ["./client-marketplace-supplier-filters.component.scss"],
})
export class ClientMarketplaceSupplierFiltersComponent implements OnInit {
	@Output() filterEvent: EventEmitter<any> = new EventEmitter<any>();

	public form: FormGroup = new FormGroup<any>({ productCategories: [] });
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	constructor() {
	}

	ngOnInit(): void {
		this.form.valueChanges.subscribe((value: any) => {
			const valueForEmit: any = {};
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
