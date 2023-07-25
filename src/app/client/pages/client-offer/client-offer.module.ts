import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// import { B2bNgxImagesCarouselModule } from "@b2b/ngx-images-carousel";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
// import { B2bNgxTooltipModule } from "@b2b/ngx-tooltip";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
// import { B2bNgxDividerModule } from "@b2b/ngx-divider";
import { ClientOfferComponent} from "./layout/client-offer.component";
import { ClientOfferRoutingModule} from "./client-offer-routing.module";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { ClientOfferMapComponent } from "./components/client-offer-map/client-offer-map.component";
// import { AgmCoreModule } from "@agm/core";
import { ClientOfferDocumentComponent } from "./components/client-offer-document/client-offer-document.component";
import { ClientOfferImagesComponent } from "./components/client-offer-images/client-offer-images.component";
import { NgxDocViewerModule } from "ngx-doc-viewer";
import { TranslocoModule } from "@ngneat/transloco";
import { NgxTippyModule } from "ngx-tippy-wrapper";
import { ClientOfferReportComponent } from "./components/client-offer-report/client-offer-report.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClientOfferContactSupplierComponent } from "./components/client-offer-contact-supplier/client-offer-contact-supplier.component";
import { Meta } from "@angular/platform-browser";
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {
  B2bNgxImagesCarouselModule
} from "../../../../../projects/ngx-images-carousel/src/lib/ngx-images-carousel.module";
@NgModule({
	declarations: [
		ClientOfferComponent,
		ClientOfferMapComponent,
		ClientOfferDocumentComponent,
		ClientOfferContactSupplierComponent,
	],
  imports: [
		ClientOfferImagesComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientOfferRoutingModule,
    ClientOfferReportComponent,
    // B2bNgxImagesCarouselModule,
    // B2bNgxButtonModule,
    B2bNgxLinkModule,
    // B2bNgxTooltipModule,
    B2bNgxIconModule,
    // B2bNgxDividerModule,
    B2bNgxSkeletonModule,
    B2bNgxImageModule,
    // AgmCoreModule,
    NgxDocViewerModule,
    NgxTippyModule,
    TranslocoModule,
    NgxIntlTelInputModule,
    B2bNgxButtonModule,
    B2bNgxImagesCarouselModule
  ],
	providers: [Meta]
})
export class ClientOfferModule {}
