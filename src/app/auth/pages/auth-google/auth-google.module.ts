import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { AuthGoogleComponent } from "./layout/auth-google.component";
import { AuthGoogleRoutingModuleModule } from "./auth-google-routing.module";
import { TranslocoModule } from "@ngneat/transloco";
import { B2bNgxImageModule } from "@b2b/ngx-image";

@NgModule({
	declarations: [AuthGoogleComponent],
	imports: [
		CommonModule,
		AuthGoogleRoutingModuleModule,
		ReactiveFormsModule,
		B2bNgxButtonModule,
		TranslocoModule,
		B2bNgxImageModule,
	],
})
export class AuthGoogleModule {}
