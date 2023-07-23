import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminUserRoutingModule } from "./admin-user-routing.module";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [],
	imports: [CommonModule, AdminUserRoutingModule, TranslocoModule],
})
export class AdminUserModule {}
