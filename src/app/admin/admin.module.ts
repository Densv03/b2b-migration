import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslocoModule } from "@ngneat/transloco";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./layout/admin.component";
import { AdminSidenavComponent } from "./components/admin-sidenav/admin-sidenav.component";

@NgModule({
	declarations: [AdminComponent, AdminSidenavComponent],
	imports: [CommonModule, AdminRoutingModule, TranslocoModule],
})
export class AdminModule {}
