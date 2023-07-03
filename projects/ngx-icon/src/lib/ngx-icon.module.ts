import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxIconDirective } from "./directive/ngx-icon.directive";
import { B2bNgxIconComponent} from "./layout/ngx-icon.component";
import { AngularSvgIconModule } from "angular-svg-icon";

@NgModule({
  imports: [CommonModule, AngularSvgIconModule.forRoot()],
  declarations: [B2bNgxIconDirective, B2bNgxIconComponent],
  exports: [B2bNgxIconDirective, B2bNgxIconComponent],
})
export class B2bNgxIconModule {}
