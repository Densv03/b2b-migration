import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminHomepageRoutingModule } from "./admin-homepage-routing.module";
import { AdminHomepageComponent } from "./layout/admin-homepage.component";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { ReactiveFormsModule } from "@angular/forms";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxSelectModule } from "@b2b/ngx-select";

@NgModule({
	declarations: [AdminHomepageComponent],
	imports: [
		CommonModule,
		AdminHomepageRoutingModule,
		B2bNgxButtonModule,
		B2bNgxInputModule,
		ReactiveFormsModule,
		B2bNgxSelectModule,
	],
})
export class AdminHomepageModule {}
