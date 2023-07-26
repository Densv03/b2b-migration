import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter, forwardRef,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";

import { map } from "rxjs/operators";
import {filter, Observable, Subject, tap} from "rxjs";
import {TranslocoService} from "@ngneat/transloco";

import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {AuthService} from "../../../../../auth/services/auth/auth.service";
import {InitialCategoryState} from "../../shared/models/initial-category-state.model";
import {ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "b2b-client-marketplace-filters",
	templateUrl: "./client-marketplace-filters.component.html",
	styleUrls: ["./client-marketplace-filters.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ClientMarketplaceFiltersComponent),
			multi: true,
		}
	]
})
export class ClientMarketplaceFiltersComponent implements OnInit, OnDestroy, ControlValueAccessor {
	@Input()
	public set filterValues(values: any) {
		if (Object.values(values)) {
			this.form.patchValue({...values});
		}
	}
	@Input() initialCategoryState: InitialCategoryState;
	@Output() filterEvent: EventEmitter<any> = new EventEmitter<any>();

	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	public roles$: Observable<any[]> = this.getRoles();

	public categoriesList: any[] = [];
	public form = this.formBuilder.group({
		"categories[]": [[]],
		"country": [null],
		"type": [null],
	});

	onChange: any = () => {};
	onTouched: any = () => {};

	private componentIsDestroyed: Subject<void> = new Subject<void>();

	constructor(
		private dialog: MatDialog,
		private authService: AuthService,
		private translocoService: TranslocoService,
		private formBuilder: FormBuilder,
		private router: Router
	) {}


	public ngOnInit(): void {
		let previousValue = {};

		this.form.valueChanges.pipe(
			filter(data => !this.areObjectEqual(data, previousValue)),
			tap(data => previousValue = data),
		).subscribe((value: any) => {
			this.onChange(value);
		});
	}


	public resetForm(): void {
		this.form.reset();
		this.router.navigate(['b2bmarket/listing']);
	}

	private getRoles(): Observable<any[]> {
		return this.authService.getRoles().pipe(
			map((roles) =>
				roles.map((role) => {
					const roleName = this.translocoService.translate(`ROLES.${role.name.toUpperCase()}_NAME`);

					return {
						...role,
						description: this.translocoService.translate(`ROLES.${role.name.toUpperCase()}`),
						displayName: roleName.charAt(0).toUpperCase() + roleName.slice(1),
					};
				})
			),
			map((roles) => roles.filter((role) => role.displayName === "Trader" || role.displayName === "Manufacturer"))
		);
	}

	private areObjectEqual(obj1: any, obj2: any): boolean {
		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);

		if (keys1.length !== keys2.length) {
			return false;
		}

		for (const key of keys1) {
			const val1 = obj1[key];
			const val2 = obj2[key];
			const areObjects = this.isObject(val1) && this.isObject(val2);
			if (
				areObjects && !this.areObjectEqual(val1, val2) ||
				!areObjects && val1 !== val2
			) {
				return false;
			}
		}

		return true;
	}

	private isObject(object: any): boolean {
		return object != null && typeof object === 'object';
	}
	ngOnDestroy(): void {
		this.componentIsDestroyed.next();
	}


	writeValue(value: any): void {
		this.form.patchValue(value);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
}
