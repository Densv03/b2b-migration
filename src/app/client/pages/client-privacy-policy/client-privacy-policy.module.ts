import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientPrivacyPolicyRoutingModule } from "./client-privacy-policy-routing.module";
import { ClientPrivacyPolicyComponent } from "./layout/client-privacy-policy.component";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [ClientPrivacyPolicyComponent],
	imports: [CommonModule, ClientPrivacyPolicyRoutingModule, TranslocoModule],
})
export class ClientPrivacyPolicyModule {}
