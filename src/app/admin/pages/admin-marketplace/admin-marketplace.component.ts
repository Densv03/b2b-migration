import {Component, OnInit} from "@angular/core";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {BehaviorSubject, Observable} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

enum VisibleListEnum {
	DEFAULT,
	PRODUCTS,
	COMPANIES
}

@UntilDestroy()
@Component({
	selector: "b2b-admin-marketplace",
	templateUrl: "./admin-marketplace.component.html",
	styleUrls: ["./admin-marketplace.component.scss"],
})
export class AdminMarketplaceComponent implements OnInit {
	public form: FormGroup = this.fb.group({
		activeSelection: 'categories',
	});
	public VisibleListEnum = VisibleListEnum;
	public dropdownOptions = [
		{
			label: 'Find by product category',
			id: 'categories',
		},
		{
			label: 'Find by company name',
			id: 'products'
		}
	];
	private activeSelectionSource: BehaviorSubject<VisibleListEnum> = new BehaviorSubject<VisibleListEnum>(VisibleListEnum.DEFAULT);
		constructor(private fb: FormBuilder) {
		}

		ngOnInit() {
			this.form.get('activeSelection').valueChanges.subscribe((listType: any) => {
				switch (listType) {
					case 'products':
						this.activeSelectionSource.next(VisibleListEnum.COMPANIES)
						break;
					case 'categories':
						this.activeSelectionSource.next(VisibleListEnum.PRODUCTS);
						break;
				}
			})
		}

		public get activeSelection$(): Observable<VisibleListEnum> {
			return this.activeSelectionSource.asObservable();
		}
}
