import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminOffersListComponent } from "./layout/admin-offers-list.component";
import { B2bNgxDropdownModule } from "@b2b/ngx-dropdown";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxIconModule } from "@b2b/ngx-icon";

@NgModule({
	declarations: [AdminOffersListComponent],
	exports: [AdminOffersListComponent],
	imports: [CommonModule, RouterModule, B2bNgxDropdownModule, B2bNgxImageModule, B2bNgxButtonModule, B2bNgxIconModule],
})
export class AdminOffersListModule {}
