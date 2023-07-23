import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { GetPaymentPlanResponse } from "../../../../../core/models/admin-billing/responses/get-payment-plan-response.model";

@Component({
	selector: "b2b-admin-payment-plan-list",
	templateUrl: "./admin-payment-plan-list.component.html",
	styleUrls: ["./admin-payment-plan-list.component.scss"],
})
export class AdminPaymentPlanListComponent implements OnInit {
	@Input() public paymentPlans: GetPaymentPlanResponse[];

	@Output() onDelete = new EventEmitter<string>();
	@Output() onEdit = new EventEmitter<GetPaymentPlanResponse>();

	constructor() {}

	ngOnInit(): void {}

	public deletePaymentPlan(id: string): void {
		this.onDelete.emit(id);
	}

	public editPaymentPlan(paymentPlan: GetPaymentPlanResponse): void {
		this.onEdit.emit(paymentPlan);
	}
}
