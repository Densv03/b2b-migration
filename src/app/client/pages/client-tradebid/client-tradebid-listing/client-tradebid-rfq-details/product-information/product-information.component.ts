import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { CategoriesService } from "../../../../../services/categories/categories.service";
import { Observable } from "rxjs";
// @ts-ignore
import { getName } from "country-list";
import { filter, first, map } from "rxjs/operators";
import { UnitsService } from "../../../../../services/units/units.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
	selector: "b2b-product-information",
	templateUrl: "./product-information.component.html",
	styleUrls: ["./product-information.component.scss"],
})
export class ProductInformationComponent implements OnInit {
	@Input() rfqInfo: any;

	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public measureName: string = "";

	constructor(
		private dialog: MatDialog,
		private categoriesService: CategoriesService,
		private changeDetectionRef: ChangeDetectorRef,
		private unitService: UnitsService
	) {}

	ngOnInit() {
		this.unitService
			.getUnits()
			.pipe(
				filter((data) => !!data?.length),
				first(),
				map((res) => {
					this.measureName = res.find((item: { _id: any; }) => item._id === this.rfqInfo.measure).displayName;
				})
			)
			.subscribe(() => {
				this.changeDetectionRef.detectChanges();
			});
	}

	public getCategoryNameById(id: string): Observable<string> {
		return this.categoriesService.getCategoryNameById(id);
	}

	public getCountryNameByCode(countryCode: string): string {
		return countryCode ? getName(countryCode?.toUpperCase()) : "";
	}
}
