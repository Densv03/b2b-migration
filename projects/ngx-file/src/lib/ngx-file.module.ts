import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { B2bNgxFileComponent } from "./layout/ngx-file.component";
import { B2bNgxButtonModule } from "@b2b/ngx-button";
import { B2bNgxIconModule } from "@b2b/ngx-icon";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, B2bNgxButtonModule, B2bNgxIconModule, MatDialogModule],
	declarations: [B2bNgxFileComponent],
	exports: [B2bNgxFileComponent],
})
export class B2bNgxFileModule {}
