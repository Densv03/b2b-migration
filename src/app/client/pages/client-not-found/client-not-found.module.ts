import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientNotFoundRoutingModule } from "./client-not-found-routing.module";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import {ClientNotFoundComponent} from "./layout/client-not-found.component";
import {TranslocoModule} from "@ngneat/transloco";

@NgModule({
	declarations: [ClientNotFoundComponent],
  imports: [
    CommonModule,
    ClientNotFoundRoutingModule,
    B2bNgxImageModule,
    B2bNgxButtonModule,
    B2bNgxLinkModule,
    TranslocoModule,
  ],
})
export class ClientNotFoundModule {}
