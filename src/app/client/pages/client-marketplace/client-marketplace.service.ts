import { Injectable } from "@angular/core";
import {BehaviorSubject, filter, Observable, of, share} from "rxjs";
import { ApiService } from "../../../core/services/api/api.service";
import {first, map} from "rxjs/operators";
import { PaginationParamsModel } from "../../../core/models/pagination-params.model";
import { ProductDetailsModel } from "./models/product-details.model";
import { MarketProductModel } from "./models/market-product.model";
import {HttpParams} from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class ClientMarketplaceService {
	public readonly PRODUCTS_LIMIT = 20;

	public shippingMethods: string[] = ["EXW", "FCA", "FAS", "FOB", "CFR/CIF", "DPU", "DAP", "DDP"];
	public paymentMethods: string[] = ["T/T", "L/C", "CAD", "Other"];

	private marketplaceProductsSource: BehaviorSubject<MarketProductModel[]> = new BehaviorSubject<MarketProductModel[]>([]);
	private marketplaceProductsLengthSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	private manageProductsSource: BehaviorSubject<MarketProductModel[]> = new BehaviorSubject<MarketProductModel[]>([]);
	private manageProductsLengthSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	// private archivedProductsSource: BehaviorSubject<MarketProductModel[]> = new BehaviorSubject<MarketProductModel[]>([]);
	// private archivedProductsLengthSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	private chatsSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	private chatsLengthSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	private supplierListingSource: BehaviorSubject<MarketProductModel[]> = new BehaviorSubject<MarketProductModel[]>([]);
	private supplierListingLengthSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	private loadingSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private apiService: ApiService) {
	}

	public get marketplaceProducts$(): Observable<any> {
		return this.marketplaceProductsSource.asObservable();
	}

	public get marketplaceProductsLength$(): Observable<number> {
		return this.marketplaceProductsLengthSource.asObservable();
	}

	public get manageProducts$(): Observable<any> {
		return this.manageProductsSource.asObservable();
	}

	public get manageProductsLength$(): Observable<number> {
		return this.manageProductsLengthSource.asObservable();
	}

	// public get archivedProducts$(): Observable<any> {
	// 	return this.archivedProductsSource.asObservable();
	// }
	//
	// public get archivedProductsLength$(): Observable<number> {
	// 	return this.archivedProductsLengthSource.asObservable();
	// }

	public get supplierListing$(): Observable<MarketProductModel[]> {
		return this.supplierListingSource.asObservable();
	}

	public get supplierListingLength$(): Observable<number> {
		return this.supplierListingLengthSource.asObservable();
	}

	public get chats$(): Observable<any[]> {
		return this.chatsSource.asObservable();
	}

	public get chatsLength$(): Observable<number> {
		return this.chatsLengthSource.asObservable();
	}

	public get unreadMessagesCount$(): Observable<any> {
		return this.apiService.get("my/unreadProductMessagesCount");
	}

	public get loading$(): Observable<boolean> {
		return this.loadingSource.asObservable();
	}

	public getMarketplaceProducts(filters?: any, offset: number = 0): Observable<any> {
		this.startLoading();
		return this.apiService.get(
			`products${filters}limit=${this.PRODUCTS_LIMIT}&offset=${offset}`
			// 	{
			// 	params: { hideSold: true, limit: this.PRODUCTS_LIMIT, offset, ...filters },
			// }
		);
	}

	public updateMarketplaceProductsOnSearch(data: any): void {
		this.completeLoading();
		this.marketplaceProductsLengthSource.next(data.totalCount);
		this.marketplaceProductsSource.next(data.products);
	}

	public updateMarketplaceProducts(filters?: any, offset: number = 0): void {
		this.getMarketplaceProducts(filters, offset)
			.pipe(
				filter((data) => !!data),
				first()
			)
			.subscribe((data: any) => {
				this.completeLoading();
				this.marketplaceProductsLengthSource.next(data.totalCount);
				this.marketplaceProductsSource.next(data.products);
			});
	}

	public updateSupplierListing(id: string, categories: string[] = [], offset: number = 0, limit?: number): void {
		this.apiService
			.get("products", {
				params: {
					supplier: id,
					categories,
					limit: limit ?? this.PRODUCTS_LIMIT,
					offset
				},
			})
			.pipe(
				filter((data) => !!data),
				first()
			)
			.subscribe((data: any) => {
				this.supplierListingLengthSource.next(data.totalCount);
				this.supplierListingSource.next(data.products);
			});
	}

	public updateChats(offset: number = 0): void {
		this.startLoading();
		this.apiService
			.get("my/chats", {
				params: {typeRoom: "users,product", offset, limit: this.PRODUCTS_LIMIT},
			})
			.pipe(
				filter((data) => !!data),
				first()
			)
			.subscribe((data: any) => {
				this.completeLoading();
				this.chatsSource.next(data.chats);
				this.chatsLengthSource.next(data.totalCount);
			});
	}

	public createProduct(product: any): Observable<any> {
		return this.apiService.post("product/create", product);
	}

	public updateProduct(id: string, product: any): Observable<any> {
		return this.apiService.put(`product/${id}/update`, product);
	}

	public deleteProduct(id: string): Observable<any> {
		return this.apiService.delete(`product/${id}/delete`);
	}

	public getProductById(id: string): Observable<ProductDetailsModel> {
		return this.apiService
			.get<ProductDetailsModel>(`product/${id}`)
			.pipe(filter(data => !!data), share());
	}

	public archiveProduct(id: string): Observable<any> {
		return this.apiService.put(`product/${id}/archive`, {});
	}

	public restoreProduct(id: string): Observable<any> {
		return this.apiService.put(`product/${id}/activate`, {});
	}

	public approveProductByAdmin(id: string): Observable<any> {
		return this.apiService.post<{ id: string }>("product/product-approval", {id});
	}

	public declineProductByAdmin(id: string): Observable<any> {
		return this.apiService.post<{ id: string }>("product/product-rejection", {id});
	}

	public updateProductByAdmin(id: string, product: any): Observable<any> {
		return this.apiService.patch(`product/${id}/update-product-admin`, product);
	}

	public deleteProductByAdmin(id: string): Observable<any> {
		return this.apiService.delete(`product/${id}/delete-product-admin`);
	}

	public archiveProductByAdmin(id: string): Observable<any> {
		return this.apiService.put(`product/${id}/archive-admin`, {});
	}

	public updateProductsByAdmin(queryObj: PaginationParamsModel, otherParams?: any): void {
		this.startLoading();
		this.getProductsByAdmin(queryObj, otherParams)
			.pipe(first())
			.subscribe((res) => {
				this.completeLoading();
				this.marketplaceProductsSource.next(res.products);
				this.marketplaceProductsLengthSource.next(res.totalCount);
			});
	}

	public updateSupplierProducts(supplierId: string, paginationParams: PaginationParamsModel): void {
		this.startLoading();
		this.getSupplierProducts(supplierId, paginationParams)
			.pipe(first())
			.subscribe((res) => {
				this.completeLoading();
				this.supplierListingSource.next(res.products);
				this.supplierListingLengthSource.next(res.totalCount);
			});
	}

	public getUserMarketProducts(): Observable<any> {
		return this.apiService.get('products/my')
			.pipe(
				filter((data: any) => !!data),
				map(({products}) => products))
	}

	public updateManageProducts(offset: number = 0, queryParam?: string): void {
		this.startLoading();
		let url = `products/my?limit=${this.PRODUCTS_LIMIT}&offset=${offset}&`;
		if(queryParam) {
			url += `${queryParam}=true`
		}

		this.apiService
			.get(url).pipe(
				filter((data) => !!data),
				first())
			.subscribe((data: any) => {
				this.completeLoading();
				this.manageProductsLengthSource.next(data.totalCount);
				this.manageProductsSource.next(data.products);
				if (data.products.length === 0 && data.totalCount > 0 && offset - this.PRODUCTS_LIMIT >= 0) {
					this.updateManageProducts(offset - this.PRODUCTS_LIMIT);
				}
			});
	}

	// public updateArchivedProducts(offset: number = 0): void {
	// 	this.startLoading();
	// 	this.apiService
	// 		.get(`products/my?hide=true&limit=${this.PRODUCTS_LIMIT}&offset=` + offset)
	// 		.pipe(
	// 			filter((data) => !!data),
	// 			first()
	// 		)
	// 		.subscribe((data: any) => {
	// 			this.completeLoading();
	// 			this.archivedProductsSource.next(data.products);
	// 			this.archivedProductsLengthSource.next(data.totalCount);
	//
	// 			if (data.products.length === 0 && data.totalCount > 0 && offset - this.PRODUCTS_LIMIT >= 0) {
	// 				this.updateArchivedProducts(offset - this.PRODUCTS_LIMIT);
	// 			}
	// 		});
	// }

	public getChatsByProductId(id: string): Observable<any[]> {
		return this.apiService.get(`product/${id}/chats`);
	}

	public completeLoading(): void {
		this.loadingSource.next(false);
	}

	public startLoading(): void {
		this.loadingSource.next(true);
	}

	public getMarketplaceSkeletonOptions() {
		return [
			{
				count: 5,
				animation: "progress",
				theme: {
					height: "160px",
				},
			},
		];
	}
	public getCompanyByName(name: string, paginationParams: PaginationParamsModel): Observable<{companies: any[], totalCount: number}> {
		return this.apiService.get("products/get-company", {params: {...paginationParams, q: name}});
	}

	private getSupplierProducts(supplierId: string, {offset, limit}: PaginationParamsModel): Observable<any> {
		return this.apiService.get(`products?supplier=${supplierId}&limit=${limit}&offset=${offset}`);
	}

	private getProductsByAdmin(queryObj: PaginationParamsModel, otherParams?: any): Observable<any> {
		return this.apiService.get("products/get-products-admin", {
			params: {offset: queryObj.offset, limit: queryObj.limit, ...otherParams},
		});
	}
}
