import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthJoinUsRoutingModule } from "./auth-join-us-routing.module";
import { AuthJoinUsComponent } from "apps/site/src/app/auth/pages/auth-join-us/layout/auth-join-us.component";
import { B2bNgxInputModule } from "@b2b/ngx-input";
import { B2bNgxLinkModule } from "@b2b/ngx-link";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { AuthJoinUsRolesListComponent } from "./components/auth-join-us-roles-list/auth-join-us-roles-list.component";
import { B2bNgxSkeletonModule } from "@b2b/ngx-skeleton";
import { TranslocoModule } from "@ngneat/transloco";

@NgModule({
	declarations: [AuthJoinUsComponent, AuthJoinUsRolesListComponent],
	imports: [
		CommonModule,
		AuthJoinUsRoutingModule,
		B2bNgxInputModule,
		B2bNgxLinkModule,
		B2bNgxIconModule,
		B2bNgxSkeletonModule,
		TranslocoModule,
	],
})
export class AuthJoinUsModule {}
