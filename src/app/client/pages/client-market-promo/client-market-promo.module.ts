import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientMarketPromoRoutingModule } from './client-market-promo-routing.module';
import { ClientMarketPromoComponent } from './layout/client-market-promo.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import {B2bNgxButtonModule} from "@b2b/ngx-button";
import {B2bNgxLinkModule} from "@b2b/ngx-link";
import {B2bNgxIconModule} from "@b2b/ngx-icon";
import { WriteToSupportModule } from '../../shared/components/write-to-support/write-to-support.module';


@NgModule({
  declarations: [
    ClientMarketPromoComponent,
    CountdownComponent
  ],
    imports: [
        CommonModule,
        ClientMarketPromoRoutingModule,
        B2bNgxButtonModule,
        B2bNgxLinkModule,
        B2bNgxIconModule,
        WriteToSupportModule
    ]
})
export class ClientMarketPromoModule { }
