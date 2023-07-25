import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientAnnualPaymentRoutingModule } from './client-annual-payment-routing.module';
// import { B2bNgxTabsModule } from '@b2b/ngx-tabs';
import { B2bNgxIconModule } from '@b2b/ngx-icon';
import { B2bNgxButtonModule } from '@b2b/ngx-button';
import { B2bNgxListModule } from '@b2b/ngx-list';
import { B2bNgxInputModule } from '@b2b/ngx-input';
import { ReactiveFormsModule } from '@angular/forms';
// import { ErrorTailorModule } from "@ngneat/error-tailor";
import { TranslocoModule } from '@ngneat/transloco';
import { B2bNgxTelModule } from '@b2b/ngx-tel';
import { B2bNgxCountrySelectModule } from '@b2b/ngx-country-select';
import { B2bNgxImageModule } from '@b2b/ngx-image';
import { B2bNgxLinkModule } from '@b2b/ngx-link';
import { ClientAnnualPaymentComponent } from './layout/client-annual-payment.component';

@NgModule({
  declarations: [ClientAnnualPaymentComponent],
  imports: [
    CommonModule,
    ClientAnnualPaymentRoutingModule,
    ReactiveFormsModule,
    // ErrorTailorModule,
    // B2bNgxTabsModule,
    B2bNgxIconModule,
    B2bNgxButtonModule,
    B2bNgxListModule,
    B2bNgxInputModule,
    B2bNgxTelModule,
    B2bNgxCountrySelectModule,
    B2bNgxImageModule,
    TranslocoModule,
    B2bNgxLinkModule,
  ],
})
export class ClientAnnualPaymentModule {}
