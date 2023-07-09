import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientProfileBillingRoutingModule } from "./client-profile-billing-routing.module";
import { TranslocoModule } from "@ngneat/transloco";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
// import { DialogModule } from "@ngneat/dialog";
import { AnnualBillingComponent } from "./components/annual-billing/annual-billing.component";
import { TradebidPurchaseComponent } from "./components/tradebid-purchase/tradebid-purchase.component";
import { MatTabsModule } from "@angular/material/tabs";
import { InvoicesModule } from "./shared/invoices/invoices.module";
import { ClientProfileBillingComponent } from "./layout/client-profile-billing.component";

@NgModule({
	declarations: [ClientProfileBillingComponent, AnnualBillingComponent, TradebidPurchaseComponent],
	exports: [AnnualBillingComponent, TradebidPurchaseComponent],
	imports: [
		CommonModule,
		ClientProfileBillingRoutingModule,
		TranslocoModule,
		B2bNgxButtonModule,
		B2bNgxIconModule,
		B2bNgxImageModule,
		B2bNgxLinkModule,
		// DialogModule,
		MatTabsModule,
		InvoicesModule,
	],
})
export class ClientProfileBillingModule {}
