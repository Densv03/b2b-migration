import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { TranslocoModule } from "@ngneat/transloco";
import { ClientAccountNotRegisteredRoutingModule } from "./client-account-not-registered-routing.module";
import { ClientAccountNotRegisteredComponent } from "./layout/client-account-not-registered.component";

@NgModule({
	declarations: [ClientAccountNotRegisteredComponent],
	imports: [CommonModule, ClientAccountNotRegisteredRoutingModule, B2bNgxButtonModule, TranslocoModule],
})
export class ClientAccountNotRegistereModule {}
