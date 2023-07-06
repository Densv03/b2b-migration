import {Component, Input, OnInit} from "@angular/core";
import { MarketProductModel } from "../../../../../client-marketplace/models/market-product.model";
import {dropdownLabels} from "../../../../../../../../../../../libs/ngx-dropdown/src/lib/dropdown-labels.enum";
import {EditMode} from "../client-profile-marketplace-edit-product/client-profile-marketplace-edit-product.component";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {ClientMarketplaceService} from "../../../../../client-marketplace/client-marketplace.service";

@Component({
	selector: "b2b-client-profile-marketplace-product-item",
	templateUrl: "./client-profile-marketplace-product-item.component.html",
	styleUrls: ["./client-profile-marketplace-product-item.component.scss"],
})
export class ClientProfileMarketplaceProductItemComponent implements OnInit{
	@Input() product: MarketProductModel;

	public readonly isMobile = window.innerWidth < 576;

	public itemsForDropdown: any[] = [];

	constructor(private clientMarketplaceService: ClientMarketplaceService,
							private router: Router,
							private hotToastService: HotToastService,) {}

	ngOnInit() {
		this.updateItemsForDropDown();
	}

	private updateItemsForDropDown(): void {
		if (this.product.hidden) {
			this.itemsForDropdown = this.getItemsForArchiveDropdown();
		} else {
			this.itemsForDropdown = this.getItemsForProductsDropdown();
		}
	}

	private getItemsForArchiveDropdown(): any[] {
		return [
			{
				label: dropdownLabels.RESTORE,
				icon: "edit",
				onClick: (productId, paymentMethods) => {
					if (!paymentMethods.length) {
						this.router.navigate(["/profile/your-workspace/b2bmarket/edit", productId],
							{queryParams: {mode: EditMode.ARCHIVE}})
						this.hotToastService.warning("Please edit product info firstly");
					} else {
						this.clientMarketplaceService
							.restoreProduct(productId)
							.pipe(
								this.hotToastService.observe({
									loading: "Restoring product...",
									success: "Product restored",
									error: "Error restoring product",
								})
							)
							.subscribe(() => {
								this.clientMarketplaceService.updateManageProducts();
							});
					}
				},
			},
			{
				label: dropdownLabels.DELETE,
				icon: "delete-red",
				onClick: (productId) => {
					this.deleteProduct(productId);
				},
			},
			{
				label: dropdownLabels.EDIT,
				icon: "edit",
				onClick: (productId) => {
					this.router.navigate(["profile", "your-workspace", "b2bmarket", "edit", productId], {
						queryParams: { mode: EditMode.ARCHIVE },
					});
				},
			},
		];
	}

	private deleteProduct(id: string): void {
		this.clientMarketplaceService
			.deleteProduct(id)
			.pipe(
				this.hotToastService.observe({
					loading: "Deleting product...",
					success: "Product deleted",
					error: "Error deleting product",
				})
			)
			.subscribe(() => {
				this.clientMarketplaceService.updateManageProducts();
			});
	}

	private getItemsForProductsDropdown(): any[] {
		return [
			{
				label: dropdownLabels.EDIT,
				icon: "edit",
				onClick: (productId) => {
					this.router.navigate(["profile", "your-workspace", "b2bmarket", "edit", productId], {
						queryParams: { mode: EditMode.EDIT },
					});
				},
			},
			{
				label: dropdownLabels.ARCHIVE,
				icon: "archive-red",
				onClick: (productId) => {
					this.clientMarketplaceService
						.archiveProduct(productId)
						.pipe(
							this.hotToastService.observe({
								loading: "Archiving product...",
								success: "Product archived",
								error: "Error archiving product",
							})
						)
						.subscribe(() => {
							this.clientMarketplaceService.updateManageProducts();
						});
				},
			},
		];
	}

	public restoreProduct(id: string): void {
		this.clientMarketplaceService
			.restoreProduct(id)
			.pipe(
				this.hotToastService.observe({
					loading: "Restoring product...",
					success: "Product restored",
					error: "Error restoring product",
				})
			)
			.subscribe(() => {
				this.clientMarketplaceService.updateManageProducts();
			});
	}
}
