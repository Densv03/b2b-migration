import {Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {MatStepper} from "@angular/material/stepper";
import {BasicInfoInterface} from "./models/basic-info.interface";
import {AuthService} from "../../services/auth/auth.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../client/pages/client-profile/services/user/user.service";
import {HotToastService} from "@ngneat/hot-toast";
import {combineLatest} from "rxjs";
import {User} from "../../../core/models/user/user.model";
import {TradebidService} from "../../../client/pages/client-tradebid/tradebid.service";
import {MixpanelService} from "../../../core/services/mixpanel/mixpanel.service";

@UntilDestroy()
@Component({
	selector: "b2b-auth-register",
	templateUrl: "./auth-register.component.html",
	styleUrls: ["./auth-register.component.scss"],
})
export class AuthRegisterComponent implements OnInit {
	@ViewChild("stepper") stepper!: MatStepper;

	public user!: User;
	public selectedUserType: "buyer" | "supplier" = 'buyer';
	public stepperSelectedIndex = 0;
	private basicInfo!: BasicInfoInterface;

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly userService: UserService,
		private readonly _hotToastService: HotToastService,
		private readonly route: ActivatedRoute,
		private readonly tradebidService: TradebidService,
    private readonly mixpanelService: MixpanelService
	) {
		this.updateStepperSelectedIndex();
	}
  @HostListener('window:beforeunload', ['$event'])
  public unloadHandler(event: BeforeUnloadEvent): void {
    event.preventDefault();
    event.returnValue = '';
  }

	public ngOnInit(): void {
		if (this.userService.getUser()) {
			this.user = this.userService.getUser();
		} else if (!this.userService.getUser() && !this.authService.userCredentials$.value) {
      this.router.navigate(['auth/register-credentials'])
    }
	}

	public back(): void {
		this.stepper.previous();
	}

	public firstStep(stepper: MatStepper, event: BasicInfoInterface): void {
		stepper.next();
		this.basicInfo = event;
    this.mixpanelService.track('User completed "Basic info" step of Sign-up');
	}

	public secondStep(stepper: MatStepper, event: "buyer" | "supplier"): void {
		stepper.next();
		this.selectedUserType = event;
    this.mixpanelService.track('User completed "Account type" step of sign-up', {'User Property': event});
	}

	public thirdStep(event: any): void {
		if (this.stepperSelectedIndex > 0 || this.authService.isRegisteredByGoogle.value) {
			this.updateUserData(event);
		} else {
			this.registerUser(event);
		}
	}

	private registerUser(event: any): void {
		const model = {...this.authService.userCredentials$.value, ...this.basicInfo, ...event};
		model.preferences = event.categories;
		model.passwordConfirm = model.password;
		this.authService.registerWithForm(model)
			.pipe(untilDestroyed(this))
			.subscribe(({token}) => {
        this.mixpanelService.signUp({
          'User_id': model._id,
          'Registration date': new Date().toISOString(),
          'Email confirmed': model.email,
          'Company Name': model.company,
          'Product sectors': model.categories,
          'Country': model.country,
        }, 'User completed "Company info" step of Sign-up');
				this.authService.updateToken(token);
				this.authService.initUser();
				this.router.navigateByUrl(`/email-verify?email=${this.authService.userCredentials$.value.email}`);
			})
	}

	private updateUserData(event: any): void {
		const {rootRoleId, roleId} = event;
		let user = {...this.userService.getUser(), roleId, rootRoleId, ...event};
		if (this.basicInfo) {
			user = {...user, ...this.basicInfo?.phone};

			user.phoneCountryCode = this.basicInfo.phone.countryCode;
			user.phoneDialCode  = this.basicInfo.phone.dialCode;
			user.phoneE164Number = this.basicInfo.phone.e164Number;
			user.phoneInternationalNumber  = this.basicInfo.phone.internationalNumber;
			user.phoneNationalNumber = this.basicInfo.phone.nationalNumber;
			user.phoneNumber = this.basicInfo.phone.number;
			user.company = this.basicInfo?.company;
			user.fullName = this.basicInfo?.fullName;
			user.country = this.basicInfo?.country;
		}

		user.preferences = event.categories;
		const company = {...user};
		company.phone = user.phone?.number || user?.phoneNumber;
		company.dialCode = user.phone?.dialCode || user?.phoneDialCode;
		company.countryCode = user.phone?.countryCode || user?.phoneCountryCode;
		company.internationalNumber = user.phone?.internationalNumber || user?.phoneInternationalNumber;
		company.nationalNumber = user.phone?.nationalNumber || user?.phoneNationalNumber;
		company.companyName = user.company;

		combineLatest([
			this.userService.changeRole(this.userService.getToken(), roleId, rootRoleId),
			this.userService.updateUserSettings(user),
			this.tradebidService.createCompanyInfo(company)
		])
			.pipe(
				untilDestroyed(this),
				this._hotToastService.observe({
					loading: "Updating profile...",
					success: "Profile updated successfully!",
					error: "Profile updating failed!",
				})
			)
			.subscribe(() => {
				this.authService.updateUser(user);
				combineLatest([this.authService.getRootRoles(), this.authService.getRoles()]).subscribe(
					([rootRoles, roles]) => {
						const rootRoleObject = rootRoles.find((rootRole) => rootRole._id === rootRoleId);
						const roleObject = roles.find((role) => role._id === roleId);
						// @ts-ignore
            this.authService.updateUser({...this.userService.getUser(), role: roleObject, rootRole: rootRoleObject});
            this.mixpanelService.signUp({
                'User_id': user._id,
                'Registration date': new Date().toISOString(),
                'Email confirmed': user.email,
                'Company Name': user.company,
                'Product sectors': user.categories,
                'Country': user.country,
                'Login Method': user.socialAuthType
              },
              'User completed "Company info" step of Sign-up');
						if (rootRoleObject?.name === 'supplier') {
							this.router.navigateByUrl('/profile/your-account/company-information', {state: {showPopUp: true}});
						} else {
							this.router.navigate(["/"]);
						}
					}
				);
			});
	}

	private updateStepperSelectedIndex(): void {
		const newStepperIndex = this.route.snapshot.paramMap.get("registerStep");
		newStepperIndex ? (this.stepperSelectedIndex = +newStepperIndex) : null;
	}
}
