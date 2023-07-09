import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientHomeOldRoutingModule } from "./client-home-old-routing.module";
import { ClientHomeOldComponent } from "./layout/client-home.component";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxTextareaModule } from "@b2b/ngx-textarea";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { ReactiveFormsModule } from "@angular/forms";
import { ClientHomeOffersCaouselComponent } from "./components/client-home-offers-caousel/client-home-offers-caousel.component";
import { ClientHomeOffersCaouselSkeletonComponent } from "./components/client-home-offers-caousel-skeleton/client-home-offers-caousel-skeleton.component";
// import { ErrorTailorModule } from "@ngneat/error-tailor";
import { B2bNgxTelModule } from "@b2b/ngx-tel";
import { TranslocoModule } from "@ngneat/transloco";
import { ClientHomeSolutionsComponent } from "./components/client-home-solutions/client-home-solutions.component";
import { ClientHomeHeaderComponent } from "./components/client-home-header/client-home-header.component";

@NgModule({
	declarations: [
		ClientHomeOldComponent,
		ClientHomeOffersCaouselComponent,
		ClientHomeOffersCaouselSkeletonComponent,
		ClientHomeHeaderComponent,
		ClientHomeSolutionsComponent,
	],
	imports: [
		CommonModule,
		ClientHomeOldRoutingModule,
		ReactiveFormsModule,
		B2bNgxIconModule,
		B2bNgxImageModule,
		B2bNgxButtonModule,
		B2bNgxInputModule,
		B2bNgxTextareaModule,
		B2bNgxSelectModule,
		B2bNgxLinkModule,
		// ErrorTailorModule,
		B2bNgxTelModule,
		TranslocoModule,
	],
	exports: [ClientHomeOffersCaouselComponent, ClientHomeOffersCaouselSkeletonComponent],
})
export class ClientHomeOldModule {}
