import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslocoModule } from "@ngneat/transloco";

import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent} from "./layout/auth.component";
import { B2bNgxImageModule } from "@b2b/ngx-image";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { AuthGuardComponent } from "./components/auth-guard/auth-guard.component";
import { B2bNgxDividerModule } from "@b2b/ngx-divider";

@NgModule({
	declarations: [AuthComponent, AuthGuardComponent],
	imports: [CommonModule, AuthRoutingModule, RouterModule, B2bNgxImageModule, B2bNgxIconModule, TranslocoModule, B2bNgxDividerModule],
	exports: [AuthGuardComponent],
})
export class AuthModule {}
