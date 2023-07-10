import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { GetPaymentPlanResponse } from "../../../../../../core/models/admin-billing/responses/get-payment-plan-response.model";
import {DialogRef} from "@angular/cdk/dialog";
import {AdminBillingService} from "../../../../../../admin/services/admin-billing.service";

@Component({
	selector: "b2b-quote-purchasing-dialog",
	templateUrl: "./quote-purchasing-dialog.component.html",
	styleUrls: ["./quote-purchasing-dialog.component.scss"],
})
export class QuotePurchasingDialogComponent implements OnInit {
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	public quotesPaymentPlans$: Observable<GetPaymentPlanResponse[]> =
		this.adminBillingService.getQuotesPaymentPlansToDisplay();

	constructor(
    private readonly dialogRef: DialogRef,
		private readonly router: Router,
		private adminBillingService: AdminBillingService
	) {}

	ngOnInit(): void {}

	public closeDialog(): void {
		this.dialogRef.close();
		this.router.navigate(["/profile/billing"]);
	}
}
