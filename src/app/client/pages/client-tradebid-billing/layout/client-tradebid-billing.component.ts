import { Component, OnInit } from "@angular/core";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { PaymentService } from "../../../services/payment/payment.service";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslocoService } from "@ngneat/transloco";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../../auth/services/auth/auth.service";
import { untilDestroyed } from "@ngneat/until-destroy";
import { catchError, throwError } from "rxjs";
import { Validators } from "@angular/forms";
import { onlyNumber } from "../../../../core/helpers/validator/only-number";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";
import { onlyLatin } from "../../../../core/helpers/validator/only-latin";
import { onlyLatinAndNumberAndSymbols } from "../../../../core/helpers/validator/only -latin-numbers-symbols";
import { animate, style, transition, trigger } from "@angular/animations";
import { FormBuilder } from "@angular/forms";

@Component({
	selector: "b2b-client-tradebid-billing",
	templateUrl: "./client-tradebid-billing.component.html",
	styleUrls: ["./client-tradebid-billing.component.scss"],
	animations: [
		trigger("fadeInOut", [
			transition(":enter", [
				// :enter is alias to 'void => *'
				style({ opacity: 0 }),
				animate(500, style({ opacity: 1 })),
			]),
			transition(":leave", [
				// :leave is alias to '* => void'
				animate(500, style({ opacity: 0 })),
			]),
		]),
	],
})
export class ClientTradebidBillingComponent implements OnInit {
	public readonly formGroup = this._formBuilder.group({
		cardNum: [""],
		email: ["", [Validators.required, Validators.email, onlyLatinAndNumberAndSymbols()]],
		expDate: [""],
		postCode: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(6), onlyNumber()]],
		cardCode: [""],
		city: ["", [Validators.required, onlyLatin()]],
		country: [null, [Validators.required]],
		region: ["", [Validators.required, onlyLatin()]],
	});

	public readonly b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public readonly b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	public readonly b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;

	public quotesCount: number;
	public quotesPrice: number;
	public price: string;

	constructor(
		private readonly _formBuilder: FormBuilder,
		readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly _paymentService: PaymentService,
		private readonly _hotToastService: HotToastService,
		private readonly _translocoService: TranslocoService,
		private readonly _router: Router,
		private readonly _authService: AuthService,
		private readonly route: ActivatedRoute
	) {
		this.quotesCount = +this.route.snapshot.params['quotes'];
		this.price = this.calcQuotesPrice(this.route.snapshot.params['quotes']);
	}

	ngOnInit() {
		this._authService.user$.pipe(untilDestroyed(this)).subscribe((user) => {
			if (user && user.paymentInfo) {
				this.formGroup.patchValue({
					...user.paymentInfo,
					cardNum: `**** **** **** ${user.paymentInfo.cardNumber}`,
					expDate: `****`,
					cardCode: "***",
				});
			}
		});

		if (this.quotesCount !== 10 && this.quotesCount !== 20 && this.quotesCount !== 30) {
			this._router.navigateByUrl("/profile/billing");
		}
	}

	sendCardData(formValue: any) {
		this.formGroup.markAllAsTouched();
		this._authService.getUser().subscribe((user) => {
			if (!user.paymentInfo.cardNumber) {
				this._paymentService
					.createCustomerProfile(formValue)
					.pipe(
						untilDestroyed(this),
						catchError((error: any) => {
							return throwError(error.error.message);
						})
					)
					.subscribe({
						next: () => {
							this.buyQuotes();
							this._router.navigateByUrl(this.b2bNgxLinkService.getStaticLink("/annual-succeeded"));
						},
						error: (error) => {
							if (error === "Payment info already exist!") {
								this.buyQuotes();
							} else {
								this._router.navigateByUrl(this.b2bNgxLinkService.getStaticLink("/annual-failed"));
							}
						},
					});
			}
			this.buyQuotes();
		});
	}

	getAnnualSubscriptionRoute(): void {
		this._router.navigateByUrl("/annual-payment");
	}

	public buyQuotes(): void {
		const body = {
			amount: this.price,
			type: "rfqQuotes",
			quotesNumb: this.quotesCount,
		};

		this._paymentService
			.createPaymentByProfile(body)
			.pipe(
				untilDestroyed(this),
				catchError((error: any) => {
					this._hotToastService.error(error.error.message);
					return throwError(error.error.message);
				})
			)
			.subscribe(() => {
				this._router.navigateByUrl(this.b2bNgxLinkService.getStaticLink("/annual-succeeded"));
			});
	}

	public calcQuotesPrice(quotes: number | string): string {
		switch (+quotes) {
			case 10:
				return "49";
			case 20:
				return "79";
			case 30:
				return "99";
			default:
				return "";
		}
	}
}
