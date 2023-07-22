import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../../../../client/services/categories/categories.service";
import {ClientMarketplaceService} from "../../../../../client/pages/client-marketplace/client-marketplace.service";
import {PaginationParamsModel} from "../../../../../core/models/pagination-params.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import { ConfirmationDialogComponent} from "../../../../../client/shared/components/confirmation-dialog/confirmation-dialog.component";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {filter} from "rxjs/operators";
import {HotToastService} from "@ngneat/hot-toast";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {UserService} from "../../../../../client/pages/client-profile/services/user/user.service";
import {io} from "socket.io-client";
import {environment} from "../../../../../../environments/environment";
import {MixpanelService} from "../../../../../core/services/mixpanel/mixpanel.service";
import {Category} from "../../../../../core/models/category.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@UntilDestroy()
@Component({
	selector: 'b2b-admin-product-list',
	templateUrl: './admin-product-list.component.html',
	styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit {
	public readonly PRODUCTS_LIMIT = this.marketService.PRODUCTS_LIMIT;
	public products$: Observable<any> = this.marketService.marketplaceProducts$;
	public productsLength$: Observable<number> = this.marketService.marketplaceProductsLength$;
	public form: FormGroup = this.fb.group({
		'categories[]': [[]],
	});
	public menuOptions = this.getMenuOptions();
	private filteredQueryObj: PaginationParamsModel = {limit: this.PRODUCTS_LIMIT, offset: 0};
	private socket: any;

	constructor(private fb: FormBuilder,
							private categoriesService: CategoriesService,
							private marketService: ClientMarketplaceService,
							private router: Router,
							private dialog: MatDialog,
							private hotToastService: HotToastService,
							private userService: UserService,
							private readonly mixpanelService: MixpanelService) {
	}

	ngOnInit(): void {
		this.categoriesService.getCategories();
		this.marketService.updateProductsByAdmin(this.filteredQueryObj)

		this.form.get('categories[]').valueChanges.subscribe((categories: Category[]) => {
			this.marketService.updateProductsByAdmin(this.filteredQueryObj, {'categories[]': categories})
		});
	}

	public redirectToProductDetails(product: any): void {
		this.router.navigate(["/b2bmarket", "products", product._id]);
	}


	private getMenuOptions() {
		return [
			{
				label: "Delete",
				icon: "delete-red",
				onClick: (marketplaceItem: { category: { name: any; }[]; company: { country: any; }[]; amount: { count: string; unit: { name: string; }; }; updatedAt: any; _id: string; }) => {
					this.dialog
						.open(ConfirmationDialogComponent, {
							data: {
								title: "Delete product",
								message: "Are you sure you want to delete this product?",
								confirmButtonText: "Delete",
								confirmButtonTheme: B2bNgxButtonThemeEnum.BACKGROUND_RED,
								cancelButtonText: "Cancel",
								cancelButtonTheme: B2bNgxButtonThemeEnum.OUTLINE_BLACK,
							},
						})
						.afterClosed()
						.pipe(filter((data) => !!data))
						.subscribe(() => {
							this.mixpanelService.track('Admin deleted users the product', {
								'Product Category': marketplaceItem.category[0]?.name,
								'Supplier\'s Country': marketplaceItem.company[0]?.country,
								'Product Count': marketplaceItem.amount.count + ' ' + marketplaceItem.amount.unit.name,
								'Posting Date': marketplaceItem.updatedAt
							});
							this.deleteProductByAdmin(marketplaceItem._id);
						});
				},
			},
			{
				label: "Archive",
				icon: 'archive-red',
				onClick: (marketplaceItem: { _id: string; category: { name: any; }[]; company: { country: any; }[]; amount: { count: string; unit: { name: string; }; }; updatedAt: any; }) => {
					this.archiveProductByAdmin(marketplaceItem._id);
					this.mixpanelService.track('Admin archived users the product', {
						'Product Category': marketplaceItem.category[0]?.name,
						'Supplier\'s Country': marketplaceItem.company[0]?.country,
						'Product Count': marketplaceItem.amount.count + ' ' + marketplaceItem.amount.unit.name,
						'Posting Date': marketplaceItem.updatedAt
					});
				},
			},
			{
				label: "Report supplier",
				icon: 'contact-user',
				onClick: (marketplaceItem: { user: string; }) => this.reportSupplier(marketplaceItem.user),
			},
			{
				label: "approve by admin",
				icon: "check",
				onClick: (offer: { _id: string; category: { name: any; }[]; company: { country: any; }[]; amount: { count: string; unit: { name: string; }; }; updatedAt: any; }) => {
					this.marketService
						.approveProductByAdmin(offer._id)
						.pipe(untilDestroyed(this))
						.subscribe(() => {
							this.mixpanelService.track('Admin approved user product', {
								'Product Category': offer.category[0]?.name,
								'Supplier\'s Country': offer.company[0]?.country,
								'Product Count': offer.amount.count + ' ' + offer.amount.unit.name,
								'Posting Date': offer.updatedAt
							});
							this.hotToastService.success("approved");
							this.marketService.updateProductsByAdmin(this.filteredQueryObj)
						});
				},
			},
			{
				label: "decline by admin",
				icon: "cross",
				onClick: (offer: { _id: string; category: { name: any; }[]; company: { country: any; }[]; amount: { count: string; unit: { name: string; }; }; updatedAt: any; }) => {
					this.marketService
						.declineProductByAdmin(offer._id)
						.pipe(untilDestroyed(this))
						.subscribe(() => {
							this.mixpanelService.track('Product declined', {
								'Product Category': offer.category[0]?.name,
								'Supplier\'s Country': offer.company[0]?.country,
								'Product Count': offer.amount.count + ' ' + offer.amount.unit.name,
								'Posting Date': offer.updatedAt
							});
							this.hotToastService.success("declined");
							this.marketService.updateProductsByAdmin(this.filteredQueryObj);
						});
				},
			},
		];
	}

	private deleteProductByAdmin(id: string): void {
		this.marketService
			.deleteProductByAdmin(id)
			.pipe(
				untilDestroyed(this),
				this.hotToastService.observe({
					loading: "Deleting...",
					success: "Deleted successfully",
					error: "Error while deleting",
				})
			)
			.subscribe();
	}

	private archiveProductByAdmin(id: string): void {
		this.marketService
			.archiveProductByAdmin(id)
			.pipe(
				untilDestroyed(this),
				this.hotToastService.observe({
					loading: "Archiving...",
					success: "Archived successfully",
					error: "Error while archiving",
				})
			)
			.subscribe();
	}

	private reportSupplier(userId: string): void {
		this.openConnection(this.userService.getToken());
		this.socket.emit("start_users_chat", {
			userId,
			typeRoom: "users",
		});
		-
			this.socket.on("users_chat_info", (data: { _id: any; }) => {
				this.router.navigate(['profile/your-workspace/b2bmarket/chat/', data._id])
			});
	}

	private openConnection(token: string) {
		this.socket = io(environment.apiUrl, {
			path: "/chat",
			auth: {
				token
			},
		});
	}

	public togglePage(page: number): void {
		this.marketService.updateProductsByAdmin({limit: this.PRODUCTS_LIMIT, offset: (page - 1) * this.PRODUCTS_LIMIT});
	}
}
