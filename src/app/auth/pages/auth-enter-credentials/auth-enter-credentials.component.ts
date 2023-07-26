import {ChangeDetectionStrategy, Component} from '@angular/core';
import {B2bNgxLinkService, B2bNgxLinkThemeEnum} from "@b2b/ngx-link";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../../environments/environment.prod";
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import {animate, style, transition, trigger} from "@angular/animations";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {password} from "../../../core/helpers/validator/password";
import {UniqEmail} from "../../../core/helpers/validator/uniq-email";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {MixpanelService} from "../../../core/services/mixpanel/mixpanel.service";

@Component({
  selector: 'b2b-auth-enter-credentials',
  templateUrl: './auth-enter-credentials.component.html',
  styleUrls: ['./auth-enter-credentials.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger("fadeInOut", [
			transition(":enter", [
				// :enter is alias to 'void => *'
				style({opacity: 0}),
				animate(500, style({opacity: 1})),
			]),
			transition(":leave", [
				// :leave is alias to '* => void'
				animate(500, style({opacity: 0})),
			]),
		]),
	],
})
export class AuthEnterCredentialsComponent {

	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;
	public form: FormGroup = this.fb.group({
		email: ["", [Validators.required, Validators.email], [this.uniqEmail.uniqLogin()]],
		password: ["", [Validators.required, password()]],
		termsAndConditions: [null, Validators.requiredTrue],
	});

	public formState: {[key: string]: AbstractControl} = this.form.controls;

	private isSocialAuthButtonsVisibleSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(public readonly b2bNgxLinkService: B2bNgxLinkService,
							private readonly uniqEmail: UniqEmail,
							private readonly fb: FormBuilder,
							private readonly router: Router,
							private readonly authService: AuthService,
              private readonly mixpanelService: MixpanelService) {
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	}

	public registerWithGoogle() {
		document.location.href = `${environment.apiUrl}auth/google`;
	}

	public registerWithLinkedIn() {
		document.location.href = `${environment.apiUrl}auth/linkedin`;
	}

	public goToNextStep(form: FormGroup): void {
    this.mixpanelService.track('Sign-Up started');
		this.router.navigate(['/auth/register']);
		this.authService.userCredentials$.next(form.value);
	}
}
