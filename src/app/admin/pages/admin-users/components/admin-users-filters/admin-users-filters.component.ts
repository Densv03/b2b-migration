import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AuthService } from "../../../../../auth/services/auth/auth.service";

@UntilDestroy()
@Component({
	selector: "b2b-admin-users-filters",
	templateUrl: "./admin-users-filters.component.html",
	styleUrls: ["./admin-users-filters.component.scss"],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AdminUsersFiltersComponent),
			multi: true,
		},
	],
})
export class AdminUsersFiltersComponent implements OnInit, OnChanges, ControlValueAccessor {
	@Input() categories: any;
	public readonly b2bNgxSelectThemeEnum: typeof B2bNgxSelectThemeEnum;
	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;
	public readonly socialAuthTypesOptions = [
		{
			value: "google",
			label: "Google",
		},
		{
			value: "linkedin",
			label: "LinkedIn",
		},
		{
			value: "otherRegistrations",
			label: "Other registrations",
		},
	];

	filtersForm: FormGroup;
	userRoles$: any;
	range: any;
	parsedCategories: [];

	constructor(private formBuilder: FormBuilder, private _authService: AuthService) {
		this.b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
		this.b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
		this.parsedCategories = [];
		this.range = { start: new Date(), end: new Date() };
		this.userRoles$ = this.getRoles();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes && changes["categories"].currentValue && changes["categories"].currentValue.length) {
			this.parsedCategories = changes["categories"].currentValue.map((category: { name: any; _id: any; children: { name: any; _id: any; children: { name: any; _id: any; }[]; }[]; }) => ({
				text: category.name,
				value: category._id,
				collapsed: true,
				checked: false,
				children: category.children.map((level2Category: { name: any; _id: any; children: { name: any; _id: any; }[]; }) => ({
					text: level2Category.name,
					value: level2Category._id,
					collapsed: true,
					checked: false,
					children: level2Category.children.map((level3Category: { name: any; _id: any; }) => ({
						text: level3Category.name,
						value: level3Category._id,
						collapsed: true,
						checked: false,
					})),
				})),
			}));
		}
	}

	ngOnInit(): void {
		this.filtersForm = this.formBuilder.group({
			userType: null,
			registrationDate: this.formBuilder.control({
				// start: new Date(new Date().getFullYear(), 0, 1),
				// end: new Date(),
				startDate: null,
				endDate: null,
			}),
			fullName: null,
			company: null,
			email: null,
			phone: null,
			country: null,
			excludeCountry: null,
			website: null,
			preferences: [],
			categoryOneOrFilterType: false,
			categoryTwoOrFilterType: false,
			categoryThreeOrFilterType: false,
			lastActivity: this.formBuilder.control({
				startDate: null,
				endDate: null,
			}),
			titleOffer: null,
			offerTime: this.formBuilder.control({
				startDate: null,
				endDate: null,
			}),
			socialAuthType: "",
		});
		this.filtersForm.valueChanges.pipe(untilDestroyed(this)).subscribe((filters: any) => {
			this.onChange(filters);
		});
	}

	public getRoles() {
		return this._authService.getRoles().pipe();
	}

	/* eslint-disable */
	onChange = (filters: any) => {};

	onTouched = () => {};
	/* eslint-enable */

	registerOnChange(fn: (filters: any) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	writeValue(filters: any): void {}
}
