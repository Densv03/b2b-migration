import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { first } from "rxjs/operators";
import { Observable } from "rxjs";

import { HotToastService } from "@ngneat/hot-toast";

import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";

import { SelectBillingMethodDialogComponent } from "../components/select-billing-method-dialog/select-billing-method-dialog.component";
import { ApiService } from "../../../../core/services/api/api.service";
import { GetPaymentPlanResponse } from "../../../../core/models/admin-billing/responses/get-payment-plan-response.model";
import { AdminBillingService } from "../services/admin-billing.service";

@Component({
	selector: "b2b-admin-billing",
	templateUrl: "./admin-billing.component.html",
	styleUrls: ["./admin-billing.component.scss"],
})
export class AdminBillingComponent implements OnInit {
	constructor(
		private matDialog: MatDialog,
		private apiService: ApiService,
		private hotToastService: HotToastService,
		private adminBillingService: AdminBillingService
	) {}

	public b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
	public currentPaymentPlans: Observable<GetPaymentPlanResponse[]> = this.adminBillingService.getCurrentPaymentPlans();

	ngOnInit(): void {
		this.adminBillingService.updateCurrentPaymentPlans();
	}

	public addBillingPlan(): void {
		this.matDialog
			.open(SelectBillingMethodDialogComponent, {
				data: {},
			})
			.afterClosed()
			.subscribe((data) => {
				if (!data || data.mode !== "add") {
					return;
				}

				this.adminBillingService
					.addPaymentPlan(data.value)
					.pipe(
						this.hotToastService.observe({
							loading: "Adding payment plan...",
							success: "Payment plan added successfully",
							error: "Error adding payment plan",
						})
					)
					.subscribe(() => {
						this.adminBillingService.updateCurrentPaymentPlans();
					});
			});
	}

	public deletePaymentPlan(id: string): void {
		this.adminBillingService
			.deletePaymentPlanById(id)
			.pipe(
				this.hotToastService.observe({
					loading: "Deleting payment plan...",
					success: "Payment plan deleted successfully",
					error: "Error deleting payment plan",
				}),
				first()
			)
			.subscribe(() => {
				this.adminBillingService.updateCurrentPaymentPlans();
			});
	}

	public editPaymentPlan(paymentPlan: GetPaymentPlanResponse) {
		this.matDialog
			.open(SelectBillingMethodDialogComponent, {
				data: { paymentPlan },
			})
			.afterClosed()
			.subscribe((data) => {
				if (!data || data.mode !== "edit") {
					return;
				}

				this.adminBillingService
					.updatePaymentPlanById(data.id, data.value)
					.pipe(
						this.hotToastService.observe({
							loading: "Editing payment plan...",
							success: "Payment plan edited successfully",
							error: "Error editing payment plan",
						}),
						first()
					)
					.subscribe(() => {
						this.adminBillingService.updateCurrentPaymentPlans();
					});
			});
	}
}
