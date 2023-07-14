import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxSocialMediasComponent } from "./layout/ngx-social-medias.component";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { B2bNgxTelModule } from "@b2b/ngx-tel";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, B2bNgxIconModule, B2bNgxTelModule],
	declarations: [B2bNgxSocialMediasComponent],
	exports: [B2bNgxSocialMediasComponent],
})
export class B2bNgxSocialMediasModule {}
