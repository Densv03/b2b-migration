import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";


import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";

import { onlyNumber } from "../../../../../core/helpers/validator/only-number";
import { AddPaymentPlanResponse } from "../../../../../core/models/admin-billing/responses/add-payment-plan-response.model";

interface DropdownSelectItem {
	value: string;
	label: string;
}

@Component({
	selector: "b2b-select-billing-method-dialog",
	templateUrl: "./select-billing-method-dialog.component.html",
	styleUrls: ["./select-billing-method-dialog.component.scss"],
})
export class SelectBillingMethodDialogComponent implements OnInit {
	constructor(
		private dialogRef: MatDialogRef<SelectBillingMethodDialogComponent>,
		private formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA)
		private data: {
			paymentPlan?: Partial<AddPaymentPlanResponse>;
		}
	) {}

	public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;

	public formGroup: FormGroup = this.getFormGroup();
	public typePlanOptions: DropdownSelectItem[] = this.getTypePlanOptions();

	public isQuotesAmountInputVisible$ = this.isQuotesAmountInputVisible();

	ngOnInit(): void {
		if (this.data.paymentPlan) {
			this.formGroup.patchValue(this.data.paymentPlan);
		}

		this.initFormSettings();
	}

	public submitForm(form: FormGroup): void {
		this.dialogRef.close({ value: form.value, mode: this.getEditMode(), id: this.data?.paymentPlan?._id });
	}

	public getButtonText(): string {
		return this.getEditMode() === "add" ? "Add payment plan" : "Edit payment plan";
	}

	private initFormSettings(): void {
		this.formGroup.get("typePlan").valueChanges.subscribe((value: string) => {
			if (value === "quotes") {
				this.formGroup.get("amountOfQuotes").setValidators([Validators.required, onlyNumber()]);
			} else {
				this.formGroup.get("amountOfQuotes").clearValidators();
			}

			this.formGroup.get("amountOfQuotes").updateValueAndValidity();
		});
	}

	private getFormGroup(): FormGroup {
		return this.formBuilder.group({
			typePlan: [null, Validators.required],
			title: [null, Validators.required],
			price: [null, [Validators.required, onlyNumber()]],
			amountOfQuotes: [null],
			description: [null, Validators.required],
		});
	}

	private isQuotesAmountInputVisible(): Observable<boolean> {
		return this.formGroup.get("typePlan").valueChanges.pipe(map((value) => value === "quotes"));
	}

	private getTypePlanOptions(): DropdownSelectItem[] {
		return [
			{
				value: "subscription",
				label: "Subscription",
			},
			{
				value: "quotes",
				label: "Quotes",
			},
		];
	}

	private getEditMode(): "add" | "edit" {
		if (this.data.paymentPlan) {
			return "edit";
		}
		return "add";
	}
}
