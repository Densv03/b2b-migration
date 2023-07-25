import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { B2bNgxButtonThemeEnum } from '@b2b/ngx-button';
import { B2bNgxInputThemeEnum } from '@b2b/ngx-input';
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from '@b2b/ngx-link';
import { PaymentService } from '../../../services/payment/payment.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@UntilDestroy()
@Component({
  selector: 'b2b-client-annual-payment',
  templateUrl: './client-annual-payment.component.html',
  styleUrls: ['./client-annual-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientAnnualPaymentComponent implements OnInit {
  public readonly formGroup = this._formBuilder.group({
    cardNum: '',
    email: '',
    expDate: '',
    postCode: '',
  });

  public readonly b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
  public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
  public readonly b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;

  constructor(
    private readonly _formBuilder: FormBuilder,
    readonly b2bNgxLinkService: B2bNgxLinkService,
    private readonly _paymentService: PaymentService,
    private readonly _hotToastService: HotToastService,
    private readonly _translocoService: TranslocoService,
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {}

  ngOnInit() {
    this._authService.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      if (user && user.paymentInfo) {
        this.formGroup.patchValue({
          ...user.paymentInfo,
          cardNum: `**** **** **** ${user.paymentInfo.cardNumber}`,
          expDate: `****`,
        });
      }
    });
  }

  sendCardData(formValue: any): void {
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
          this.isSingleOffer
            ? this.buySingleOffer()
            : this.buyAnnualSubscription();
          this._router.navigateByUrl(
            this.b2bNgxLinkService.getStaticLink('/annual-succeeded')
          );
        },
        error: (error) => {
          if (error === 'Payment info already exist!') {
            this.isSingleOffer
              ? this.buySingleOffer()
              : this.buyAnnualSubscription();
          } else {
            this._router.navigateByUrl(
              this.b2bNgxLinkService.getStaticLink('/annual-failed')
            );
          }
        },
      });
  }

  buySingleOffer() {
    const body = {
      amount: 39,
      type: 'single',
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
      .subscribe((val) => {
        this._router.navigateByUrl(
          this.b2bNgxLinkService.getStaticLink('/annual-succeeded')
        );
      });
  }

  buyAnnualSubscription() {
    const body = {
      amount: 588,
      type: 'subscription',
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
        this._router.navigateByUrl(
          this.b2bNgxLinkService.getStaticLink('/annual-succeeded')
        );
      });
  }

  getAnnualSubscriptionRoute(): void {
    this._router.navigateByUrl('/annual-payment');
  }

  public get isSingleOffer() {
    return this._router.url.includes('buy-offer-39');
  }
}
