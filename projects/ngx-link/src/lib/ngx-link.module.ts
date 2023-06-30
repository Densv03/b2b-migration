import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { B2bNgxLinkDirective } from "./directive/ngx-link.directive";
import { B2bNgxLinkComponent } from "./layout/ngx-link.component";
import { B2bNgxLinkService } from "./services";

@NgModule({
	imports: [CommonModule, RouterModule],
	declarations: [B2bNgxLinkDirective, B2bNgxLinkComponent],
	providers: [B2bNgxLinkService],
	exports: [B2bNgxLinkDirective, RouterModule, B2bNgxLinkComponent],
})
export class B2bNgxLinkModule {}
