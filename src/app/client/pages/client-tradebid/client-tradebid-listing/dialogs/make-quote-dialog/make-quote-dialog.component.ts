import { Component, OnInit } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { DialogRef, DialogService } from "@ngneat/dialog";
import { QuotePurchasingDialogComponent } from "../quote-purchasing-dialog/quote-purchasing-dialog.component";

@Component({
	selector: "b2b-make-quote-dialog",
	templateUrl: "./make-quote-dialog.component.html",
	styleUrls: ["./make-quote-dialog.component.scss"],
})
export class MakeQuoteDialogComponent implements OnInit {
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	constructor(private dialogRef: DialogRef, private dialogService: DialogService) {}

	ngOnInit(): void {}

	public quoteNow(): void {
		this.dialogRef.close();
		this.dialogService.open(QuotePurchasingDialogComponent);
	}
}
