import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import {FormControl} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
	selector: "b2b-admin-offer-decline-dialog",
	templateUrl: "./admin-offer-decline-dialog.component.html",
	styleUrls: ["./admin-offer-decline-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOfferDeclineDialogComponent {
	readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	message: FormControl;
	constructor(private readonly dialogRef: MatDialogRef<AdminOfferDeclineDialogComponent>) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.message = new FormControl("");
	}

	decline() {
		this.dialogRef.close(this.message.value);
	}
}
