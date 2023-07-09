import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { TranslocoModule } from "@ngneat/transloco";
import { ClientContactUsComponent } from "./layout/client-contact-us.component";
import { B2bNgxSelectModule } from "@b2b/ngx-select";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxTelModule } from "@b2b/ngx-tel";
import { B2bNgxTextareaModule } from "@b2b/ngx-textarea";
import { ClientContactUsRoutingModule } from "./client-contact-us-routing.module";

@NgModule({
	declarations: [ClientContactUsComponent],
	imports: [
		CommonModule,
		ClientContactUsRoutingModule,
		B2bNgxSkeletonModule,
		B2bNgxImageModule,
		B2bNgxButtonModule,
		B2bNgxIconModule,

		TranslocoModule,
		B2bNgxSelectModule,
		B2bNgxInputModule,
		ReactiveFormsModule,
		B2bNgxTelModule,
		B2bNgxTextareaModule,
	],
})
export class ClientContactUsModule {}
