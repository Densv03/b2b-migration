import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ClientMarketplaceService } from "../../../../client-marketplace.service";
import { Observable } from "rxjs";
import { MarketProductModel } from "../../../../models/market-product.model";
import { PaginationParamsModel } from "../../../../../../../core/models/pagination-params.model";

@Component({
  selector: 'b2b-company-products',
  templateUrl: './company-products.component.html',
  styleUrls: ['./company-products.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyProductsComponent implements OnInit {

	@Input() userId: string;
	public products$: Observable<MarketProductModel[]> = this.marketService.supplierListing$;
	public totalProductsLength$: Observable<number> = this.marketService.supplierListingLength$;
	public PRODUCTS_LIMIT = 6;

	private filteredQueryObj: PaginationParamsModel = { limit: this.PRODUCTS_LIMIT, offset: 0 };

  constructor(private marketService: ClientMarketplaceService) { }

  ngOnInit(): void {
		this.marketService.updateSupplierProducts(this.userId, this.filteredQueryObj)
  }

	togglePage(pageNumber: number) {
		this.filteredQueryObj = { ...this.filteredQueryObj, offset: (pageNumber - 1) * this.PRODUCTS_LIMIT };
		this.marketService.updateSupplierProducts(this.userId, this.filteredQueryObj)
	}
}

