import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import {B2bNgxButtonModule} from "@b2b/ngx-button";

@NgModule({
	declarations: [ConfirmationDialogComponent],
	imports: [CommonModule, B2bNgxButtonModule],
})
export class SharedModule {}
