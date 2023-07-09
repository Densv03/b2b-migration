import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { ClientEmailConfirmationRoutingModule } from "./client-email-confirmation-routing.module";
import { ClientEmailConfirmationComponent } from "./layout/client-email-confirmation.component";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientEmailConfirmationComponent],
	imports: [CommonModule, ClientEmailConfirmationRoutingModule, B2bNgxSkeletonModule, TranslocoModule],
})
export class ClientEmailConfirmationModule {}
