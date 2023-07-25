import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { B2bNgxButtonThemeEnum } from '@b2b/ngx-button';
import { B2bNgxInputThemeEnum } from '@b2b/ngx-input';
import { HotToastService } from '@ngneat/hot-toast';
import { FormBuilder, FormControl } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval, map, switchMap, take, tap } from 'rxjs';
import { ClientContactUsModalComponent } from '../../../components/client-contact-us-modal/client-contact-us-modal.component';
import { UserService } from '../../client-profile/services/user/user.service';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { User } from 'src/app/core/models/user/user.model';

@UntilDestroy()
@Component({
  selector: 'b2b-client-email-verify',
  templateUrl: './client-email-verify.component.html',
  styleUrls: ['./client-email-verify.component.scss'],
})
export class ClientEmailVerifyComponent implements AfterViewInit {
  @ViewChild('time') timeRef: ElementRef;

  public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
  public readonly b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;

  isDisabled = true;
  email: string;
  inputWidth = 120;
  formControl: FormControl;
  isInputDisabled = true;
  user: User;

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _hotToastService: HotToastService,
    private readonly _translocoService: TranslocoService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _authService: AuthService,
    private readonly _formBuilder: FormBuilder,
    private readonly _userService: UserService
  ) {
    this.formControl = this._formBuilder.control({
      value: null,
      disabled: true,
    });
    this._activatedRoute.queryParamMap
      .pipe(
        untilDestroyed(this),
        map((paramsMap) => paramsMap.get('email'))
      )
      .subscribe((email) => {
        this.email = email;
        this.formControl.setValue(email);
      });
  }

  ngAfterViewInit() {
    const duration = this.timeRef.nativeElement;
    this.startTimer(duration);
  }

  startTimer(duration: any): void {
    let timer = 60;
    let minutes;
    let seconds;

    const intervalSubscribe = interval(1000)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        minutes = Math.floor(timer / 60);
        seconds = Math.floor(timer % 60);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        duration.textContent = minutes + ':' + seconds;

        --timer;
        if (timer < 0) {
          this.isDisabled = false;
          this._cdr.detectChanges();
          intervalSubscribe.unsubscribe();
        }
      });
  }

  sendEmailAgain() {
    this._authService
      .sendEmailAgain(this.formControl.value)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this._hotToastService.show(
          this._translocoService.translate('AUTH.CHECK'),
          {
            dismissible: true,
            id: 'email_check_msg',
            style: {
              border: '1px solid #E63D3D',
            },
            autoClose: false,
          }
        );
      });
  }

  editEmail(emitEvent = false) {
    this.isInputDisabled = !this.isInputDisabled;
    if (this.isInputDisabled || emitEvent) {
      this._authService
        .getUser()
        .pipe(
          take(1),
          switchMap((user) => {
            const body = {
              emailOld: this.email,
              emailNew: this.formControl.value,
            };
            return this._userService.updateUserEmail(body);
          })
        )
        .subscribe(() => {
          this.email = this.formControl.value;
          this._hotToastService.show(
            this._translocoService.translate('AUTH.CHECK'),
            {
              dismissible: true,
              id: 'email_check_msg',
              style: {
                border: '1px solid #E63D3D',
              },
              autoClose: false,
            }
          );
        });
    }

    this.formControl[this.isInputDisabled ? 'disable' : 'enable']();
  }

  public openContactUsModal() {
  }
}
