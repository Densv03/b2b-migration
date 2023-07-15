import { NgModule } from "@angular/core";
import { ClientMarketplaceProductItemComponent } from "./client-marketplace-product-item.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxImageModule } from "@b2b/ngx-image";

@NgModule({
	declarations: [ClientMarketplaceProductItemComponent],
	exports: [ClientMarketplaceProductItemComponent],
	imports: [
		CommonModule,
		RouterModule,
		B2bNgxIconModule,
		B2bNgxButtonModule,
		B2bNgxImageModule
	]
})

export class ClientMarketplaceProductItemModule {}
