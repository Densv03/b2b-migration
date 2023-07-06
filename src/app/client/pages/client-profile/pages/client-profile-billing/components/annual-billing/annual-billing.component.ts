import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { DialogService } from "@ngneat/dialog";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslocoService } from "@ngneat/transloco";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { of } from "rxjs";
import { filter, switchMap, take, tap } from "rxjs/operators";
import { AuthService } from "../../../../../../../auth/services/auth/auth.service";
import { PaymentService } from "../../../../../../services/payment/payment.service";
import { ApiService } from "../../../../../../../core/services/api/api.service";
import { ClientProfileAddPaymentMethodComponent } from "../../../../components/client-profile-add-payment-method/client-profile-add-payment-method.component";
import { ClientProfileDeletePaymentMethodComponent } from "../../../../components/client-profile-delete-payment-method/client-profile-delete-payment-method.component";
import { ClientProfileUpgradePlanComponent } from "../../../../components/client-profile-upgrade-plan/client-profile-upgrade-plan.component";
import * as CryptoJS from "crypto-js";

const StarterPlan = {
	type: "free",
	name: `*Starter Plan*`,
	price: `Free`,
};

const BuyerPlan = {
	type: "buyer",
	name: `Buyer`,
	price: `$588 / year`,
};

const DefaultInvoices = [
	{
		dataIssued: "March 20, 2021",
		invoice: "",
		transactionId: "999999999999",
		sum: "588 USD",
		status: "Failed",
	},
	{
		dataIssued: "January 27, 2020",
		invoice: "SR67321",
		transactionId: "999999169982",
		sum: "588 USD",
		status: "Successed",
	},
	{
		dataIssued: "January 27, 2020",
		invoice: "SR67321",
		transactionId: "999999169982",
		sum: "49 USD",
		status: "Successed",
	},
];

@UntilDestroy()
@Component({
	selector: "b2b-annual-billing",
	templateUrl: "./annual-billing.component.html",
	styleUrls: ["./annual-billing.component.scss"],
})
export class AnnualBillingComponent implements OnInit {
	public readonly b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	payment: undefined | any;
	plan = StarterPlan;
	paymentData;
	invoices = [];

	constructor(
		private readonly _dialogService: DialogService,
		private readonly _apiService: ApiService,
		private readonly _hotToastService: HotToastService,
		private readonly _translocoService: TranslocoService,
		private readonly _changeDetectorReference: ChangeDetectorRef,
		private readonly _authService: AuthService,
		private readonly _paymentService: PaymentService
	) {}

	ngOnInit() {
		this._authService
			.getUser()
			.pipe(
				filter((user) => !!user),
				untilDestroyed(this),
				tap((user: any) => {
					this.plan = BuyerPlan;

					this.payment = {
						...user.paymentInfo,
						type: "mastercard",
					};
				}),
				switchMap(() => this._paymentService.getInvoices()),
				tap((invoices: any) => {
					this.invoices = invoices;
				})
			)
			.subscribe();
	}

	get isFree() {
		return this.plan.type === "free";
	}

	addPaymentMethod() {
		this._dialogService
			.open(ClientProfileAddPaymentMethodComponent)
			.afterClosed$.pipe(
				take(1),
				switchMap((formValue) => {
					this.paymentData = formValue;
					return this._paymentService.createCustomerProfile(formValue);
				})
			)
			.subscribe((response) => {
				this.payment = {
					...this.payment,
					cardNumber: this.paymentData.cardNum.substr(this.paymentData.cardNum.length - 4),
					type: "mastercard",
				};
				this.plan = BuyerPlan;
				this.invoices = DefaultInvoices;
				this._changeDetectorReference.detectChanges();
			});
	}

	upgradePlan() {
		this._dialogService.open(ClientProfileUpgradePlanComponent, { width: 720 });
	}

	edit() {
		this._dialogService
			.open(ClientProfileAddPaymentMethodComponent, {
				data: this.payment,
			})
			.afterClosed$.pipe(
				take(1),
				switchMap((res) => {
					const updatedCard = {
						cardNum: res.cardNum,
						testMode: "1",
						expDate: res.expDate,
					};
					this.paymentData = {
						...res,
						cardNumber: this.paymentData.cardNum.substr(this.paymentData.cardNum.length - 4),
						type: "mastercard",
					};

					const body = {
						hashData: CryptoJS.AES.encrypt(JSON.stringify(updatedCard), "vDS8h!ds#32df").toString(),
					};
					return this._apiService.post("authorize-net/update-payment-by-profile", body).pipe(
						this._hotToastService.observe({
							loading: this._translocoService.translate("TOASTR.LOADING"),
							success: this._translocoService.translate("TOASTR.SUCCESS"),
							error: this._translocoService.translate("TOASTR.ERROR"),
						})
					);
				})
			)
			.subscribe((payment) => {
				if (!payment) {
					return;
				}

				// this.payment = {
				// 	...payment,
				// 	cardNumber: payment.cardNumber.substr(payment.cardNumber.length - 4),
				// 	type: "mastercard",
				// };
				// this.plan = BuyerPlan;
				// this.invoices = DefaultInvoices;

				// this._changeDetectorReference.detectChanges();
			});
	}

	delete() {
		this._dialogService
			.open(ClientProfileDeletePaymentMethodComponent)
			.afterClosed$.pipe(
				untilDestroyed(this),
				switchMap((res) => {
					if (!res) {
						return of(null);
					}

					return this._apiService.delete("authorize-net/delete-payment-by-profile").pipe(
						this._hotToastService.observe({
							loading: this._translocoService.translate("TOASTR.LOADING"),
							success: this._translocoService.translate("TOASTR.SUCCESS"),
							error: this._translocoService.translate("TOASTR.ERROR"),
						})
					);
				})
			)
			.subscribe((res) => {
				this.payment = undefined;
				this.plan = StarterPlan;
				this.invoices = [];
				this._changeDetectorReference.detectChanges();
			});
		// this._apiService.delete('delete-payment').pipe(
		// 	untilDestroyed(this),
		// 	this._hotToastService.observe({
		// 		loading: this._translocoService.translate("TOASTR.LOADING"),
		// 		success: this._translocoService.translate("TOASTR.SUCCESS"),
		// 		error: this._translocoService.translate("TOASTR.ERROR"),
		// 	})
		// ).subscribe((response) => {
		// })

		// this.payment = undefined;
		// this.plan = StarterPlan;
		// this.invoices = [];
	}
}
