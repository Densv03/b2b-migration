import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { DialogService } from "@ngneat/dialog";
import { ApiService } from "../../../../../../../core/services/api/api.service";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslocoService } from "@ngneat/transloco";
import { AuthService } from "../../../../../../../auth/services/auth/auth.service";
import { PaymentService } from "../../../../../../services/payment/payment.service";
import { filter, switchMap, take, tap } from "rxjs/operators";
import { untilDestroyed } from "@ngneat/until-destroy";
import { BehaviorSubject, Observable } from "rxjs";
import { UserService } from "../../../../services/user/user.service";
import { MatDialog } from "@angular/material/dialog";
import { ClientProfileBillingDialogComponent } from "../../../../components/client-profile-billing-dialog/client-profile-billing-dialog.component";
import { ClientProfileAddPaymentDialogComponent } from "../../../../components/client-profile-add-payment-dialog/client-profile-add-payment-modal.component";
import { ClientProfileDeletePaymentMethodDialogComponent } from "../../../../components/client-profile-delete-payment-method-dialog/client-profile-delete-payment-method-dialog.component";
import { Router } from "@angular/router";
import { environment } from "../../../../../../../../environments/environment";
import { AdminBillingService } from "../../../../../../../admin/pages/admin-billing/services/admin-billing.service";
import { GetPaymentPlanResponse } from "../../../../../../../core/models/admin-billing/responses/get-payment-plan-response.model";

@Component({
	selector: "b2b-tradebid-purchase",
	templateUrl: "./tradebid-purchase.component.html",
	styleUrls: ["./tradebid-purchase.component.scss"],
})
export class TradebidPurchaseComponent implements OnInit {
	public readonly b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	@ViewChild("purchaseForm") form: ElementRef;

	public paymentData: any;
	public payment: undefined | any;
	public invoices: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	public paymentObj: any;
	public userHasCard: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	private invoicesSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	public quotesPaymentPlans$: Observable<GetPaymentPlanResponse[]>;

	constructor(
		private readonly dialogService: DialogService,
		private readonly apiService: ApiService,
		private readonly hotToastService: HotToastService,
		private readonly translocoService: TranslocoService,
		private readonly changeDetectorRef: ChangeDetectorRef,
		private readonly authService: AuthService,
		private readonly paymentService: PaymentService,
		private readonly userService: UserService,
		private readonly router: Router,
		private readonly dialog: MatDialog,
		private readonly adminBillingService: AdminBillingService
	) {
		this.quotesPaymentPlans$ = this.adminBillingService.getQuotesPaymentPlansToDisplay();
	}

	ngOnInit() {
		this.userService.getUser().paymentInfo && this.userService.getUser().paymentInfo.cardNumber
			? this.userHasCard.next(true)
			: null;

		this.userService.getUser().paymentInfo
			? (this.paymentObj = {
					modal: ClientProfileAddPaymentDialogComponent,
					method: this.paymentService.updateCustomerProfile,
			  })
			: (this.paymentObj = {
					modal: ClientProfileBillingDialogComponent,
					method: this.paymentService.createCustomerProfile,
			  });

		this.authService
			.getUser()
			.pipe(
				filter((user) => !!user),
				untilDestroyed(this),
				tap((user: any) => {
					// this.plan = BuyerPlan;

					this.payment = {
						...user.paymentInfo,
						type: "mastercard",
					};
				}),
				switchMap(() => this.paymentService.getInvoices()),
				tap((invoices: any) => this.invoicesSource.next(invoices))
			)
			.subscribe();
	}

	public get invoices$(): Observable<any[]> {
		return this.invoicesSource.asObservable();
	}

	public addPaymentMethod() {
		this.dialog
			.open(this.paymentObj.modal)
			.afterClosed()
			.pipe(
				take(1),
				filter((val) => !!val),
				tap((formValue) => {
					this.paymentData = formValue;
					if (this.userService.getUser().paymentInfo) {
						this.paymentService
							.updateCustomerProfile(formValue)
							.pipe(
								this.hotToastService.observe({
									loading: this.translocoService.translate("TOASTR.LOADING"),
									success: this.translocoService.translate("TOASTR.SUCCESS"),
									error: this.translocoService.translate("TOASTR.ERROR"),
								})
							)
							.subscribe();
					} else {
						this.paymentService
							.createCustomerProfile(formValue)
							.pipe(
								this.hotToastService.observe({
									loading: this.translocoService.translate("TOASTR.LOADING"),
									success: this.translocoService.translate("TOASTR.SUCCESS"),
									error: this.translocoService.translate("TOASTR.ERROR"),
								})
							)
							.subscribe();
					}
				})
			)
			.subscribe(() => {
				this.userHasCard.next(true);
				this.payment = {
					...this.payment,
					cardNumber: this.paymentData.cardNum.substr(this.paymentData.cardNum.length - 4),
					type: "mastercard",
				};
				this.changeDetectorRef.detectChanges();
			});
	}

	public edit() {
		this.dialog
			.open(this.paymentObj.modal)
			.afterClosed()
			.pipe(
				take(1),
				filter((res) => !!res),
				tap((res) => {
					return this.paymentService
						.updateCustomerProfile(res)
						.pipe(
							this.hotToastService.observe({
								loading: this.translocoService.translate("TOASTR.LOADING"),
								success: this.translocoService.translate("TOASTR.SUCCESS"),
								error: this.translocoService.translate("TOASTR.ERROR"),
							})
						)
						.subscribe();
				})
			)
			.subscribe((payment) => {
				if (!payment) {
					return;
				}
				this.payment = {
					...payment,
					cardNumber: payment.cardNum.substr(payment.cardNum.length - 4),
					type: "mastercard",
				};
				this.changeDetectorRef.detectChanges();
			});
	}

	public delete() {
		this.dialog
			.open(ClientProfileDeletePaymentMethodDialogComponent)
			.afterClosed()
			.pipe(
				untilDestroyed(this),
				filter((res) => !!res),
				switchMap(() => {
					return this.apiService.delete("authorize-net/delete-payment-by-profile").pipe(
						this.hotToastService.observe({
							loading: this.translocoService.translate("TOASTR.LOADING"),
							success: this.translocoService.translate("TOASTR.SUCCESS"),
							error: this.translocoService.translate("TOASTR.ERROR"),
						})
					);
				})
			)
			.subscribe(() => {
				this.userHasCard.next(false);
				this.payment = undefined;
				this.changeDetectorRef.detectChanges();
			});
	}

	public goOnPayPage(quotesCount: number): void {
		this.userHasCard.value === true
			? this.router.navigate(["/tradebid-billing", quotesCount])
			: this.hotToastService.show("Firstly add card please!");
	}

	public goOnPaymentPage(quotesNumber: string, price: number): void {
		const requestBody = {
			amount: price,
			quotesNumb: quotesNumber,
			typeTransaction: "rfqQuotes",
			userId: this.userService.getUser()._id,
		};
		this.paymentService.getTokenForPurchaseConfirm(requestBody).subscribe((data) => {
			this.form.nativeElement[0].defaultValue = data.token;
			this.form.nativeElement.submit();
		});
		// this.form.nativeElement.submit();
	}

	public getPaymentLink(): string {
		return environment.apiUrl === "https://api-dev.b2b.discount/"
			? "https://test.authorize.net/payment/payment"
			: "https://accept.authorize.net/payment/payment";
	}
}
