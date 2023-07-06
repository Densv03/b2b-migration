import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { DialogService } from "@ngneat/dialog";

import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";

import { AdminBillingService } from "../../../../../../admin/pages/admin-billing/services/admin-billing.service";
import { GetPaymentPlanResponse } from "../../../../../../core/models/admin-billing/responses/get-payment-plan-response.model";

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
		private readonly dialogService: DialogService,
		private readonly router: Router,
		private adminBillingService: AdminBillingService
	) {}

	ngOnInit(): void {}

	public closeDialog(): void {
		this.dialogService.closeAll();
		this.router.navigate(["/profile/billing"]);
	}
}
