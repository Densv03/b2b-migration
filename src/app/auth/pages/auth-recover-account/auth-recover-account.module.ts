import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { TranslocoModule } from "@ngneat/transloco";
import { AuthRecoverAccountComponent } from "./auth-recover-account.component";

@NgModule({
	declarations: [AuthRecoverAccountComponent],
	imports: [CommonModule, B2bNgxImageModule, TranslocoModule],
	exports: [AuthRecoverAccountComponent],
})
export class AuthRecoverAccountModule {}
