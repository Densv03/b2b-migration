import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {switchMap} from "rxjs/operators";
import {ClientMarketplaceService} from "../../../../../client/pages/client-marketplace/client-marketplace.service";
import {PaginationParamsModel} from "../../../../../core/models/pagination-params.model";
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
	selector: 'b2b-admin-companies-list',
	templateUrl: './admin-companies-list.component.html',
	styleUrls: ['./admin-companies-list.component.scss']
})
export class AdminCompaniesListComponent implements OnInit {
	public PRODUCTS_LIMIT = this.marketService.PRODUCTS_LIMIT;
	public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public form: FormGroup = this.fb.group({
		q: '',
	});

	private paginationParams: PaginationParamsModel = {offset: 0, limit: this.PRODUCTS_LIMIT}
	private companyListSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	private companyListLengthSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	constructor(private fb: FormBuilder,
							private marketService: ClientMarketplaceService,
							private router: Router,
							private route: ActivatedRoute) {
	}

	public get companyList$(): Observable<any[]> {
		return this.companyListSource.asObservable()
	}

	public get companyListLength$(): Observable<number> {
		return this.companyListLengthSource.asObservable()
	}

	ngOnInit(): void {
		this.form
			.get("q")
			.valueChanges.pipe(
			switchMap((value) => this.marketService.getCompanyByName(value, this.paginationParams))
		)
			.subscribe((value: { companies: any[]; totalCount: number; }) => {
				this.companyListSource.next(value.companies);
				this.companyListLengthSource.next(value.totalCount);
			});
	}

	public redirectToProductDetails(product: any): void {
		this.router.navigate(["/b2bmarket", "products", product._id]);
	}


	toggleCompaniesPage(pageNumber: number) {
		this.paginationParams = {...this.paginationParams, offset: (pageNumber - 1) * this.PRODUCTS_LIMIT};
		this.marketService.getCompanyByName(this.form.get('q').value, this.paginationParams).subscribe(data => {
			this.companyListSource.next(data.companies);
		});
	}

	goToSupplierListing(userId: string): void {
		this.router.navigate(['supplier', userId], {
			relativeTo: this.route
		})
	}
}
