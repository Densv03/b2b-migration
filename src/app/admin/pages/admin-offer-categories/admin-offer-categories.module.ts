import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminOfferCategoriesRoutingModule } from "./admin-offer-categories-routing.module";
import { AdminOfferCategoriesComponent } from "./layout/admin-offer-categories.component";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxToggleModule } from "@b2b/ngx-toggle";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [AdminOfferCategoriesComponent],
	imports: [
		CommonModule,
		AdminOfferCategoriesRoutingModule,
		B2bNgxInputModule,
		B2bNgxButtonModule,
		B2bNgxSelectModule,
		B2bNgxToggleModule,
		ReactiveFormsModule,
		TranslocoModule,
	],
})
export class AdminOfferCategoriesModule {}
