import { NgModule } from "@angular/core";
import { ClientProfileYourAccountComponent } from "./layout/client-profile-your-account.component";
import { CommonModule } from "@angular/common";
import { ClientProfileYourAccountRoutingModule } from "./client-profile-your-account-routing.module";
import { B2bNgxButtonModule } from "@b2b/ngx-button";

@NgModule({
	declarations: [ClientProfileYourAccountComponent],
	imports: [CommonModule, B2bNgxButtonModule, ClientProfileYourAccountRoutingModule],
})
export class ClientProfileYourAccountModule {}
