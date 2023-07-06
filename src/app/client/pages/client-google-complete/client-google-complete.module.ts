import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxImageModule } from "@b2b/ngx-image";
// import { ErrorTailorModule } from "@ngneat/error-tailor";
import { TranslocoModule } from "@ngneat/transloco";
import { ClientGoogleCompleteRoutingModule } from "./client-google-complete-routing.module";
import { ClientGoogleCompleteComponent } from "./layout/client-google-complete.component";

@NgModule({
	declarations: [ClientGoogleCompleteComponent],
	imports: [
		CommonModule,
		ClientGoogleCompleteRoutingModule,
		B2bNgxImageModule,
		B2bNgxButtonModule,
		// ErrorTailorModule,
		TranslocoModule,
	],
})
export class ClientGoogleCompleteModule {}
