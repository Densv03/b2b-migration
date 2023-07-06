import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslocoModule } from "@ngneat/transloco";

import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "apps/site/src/app/auth/layout/auth.component";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { AuthGuardComponent } from "./components/auth-guard/auth-guard.component";

@NgModule({
	declarations: [AuthComponent, AuthGuardComponent],
	imports: [CommonModule, AuthRoutingModule, RouterModule, B2bNgxImageModule, B2bNgxIconModule, TranslocoModule],
	exports: [AuthGuardComponent],
})
export class AuthModule {}
