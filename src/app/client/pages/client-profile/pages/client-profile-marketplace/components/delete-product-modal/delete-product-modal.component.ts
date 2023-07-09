import { Component, OnInit } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
	selector: "b2b-delete-product-modal",
	templateUrl: "./delete-product-modal.component.html",
	styleUrls: ["./delete-product-modal.component.scss"],
})
export class DeleteProductModalComponent implements OnInit {
	public formControl: FormControl = new FormControl();
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	constructor(private dialogRef: MatDialogRef<DeleteProductModalComponent>) {}

	ngOnInit(): void {}

	public deleteProduct() {
		this.dialogRef.close(this.formControl.value);
	}
}
