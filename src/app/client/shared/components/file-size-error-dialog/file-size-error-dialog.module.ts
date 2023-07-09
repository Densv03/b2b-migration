import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSizeErrorDialogComponent } from "./file-size-error-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";



@NgModule({
  declarations: [FileSizeErrorDialogComponent],
	imports: [
		CommonModule,
		MatDialogModule
	]
})
export class FileSizeErrorDialogModule { }
