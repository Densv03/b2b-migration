import { ChangeDetectorRef, Component, HostListener, OnInit } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { TranslocoService } from "@ngneat/transloco";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FormBuilder, FormGroup } from "@ngneat/reactive-forms";

import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";

import { UserService } from "apps/site/src/app/client/pages/client-profile/services/user/user.service";
import { AmplitudeService } from "apps/site/src/app/core/services/amplitude/amplitude.service";
import { CategoriesService } from "../../../../client/services/categories/categories.service";
import { AuthService } from "../../../services/auth/auth.service";
import { AuthStore } from "../../../state/auth/auth.store";
import { onlyLatinAndNumber } from "../../../../core/helpers/validator/only-latin-and-number";
import { fullName } from "../../../../core/helpers/validator/full-name";
import { onlyLatin } from "../../../../core/helpers/validator/only-latin";
import { capitalizeFirstLetter } from "../../../../core/helpers/function/capitalize-first-letter";

function setValuesToFormData(formData: FormData, values: any, prefix?: string) {
	Object.entries(values).forEach(([key, value]: any) => {
		if (key === "logo") {
			Array.from(value).forEach((file: any) => {
				formData.append(key, file);
			});
		} else if (Array.isArray(value)) {
			value
				.filter((arrayItem) => !!arrayItem)
				.forEach((arrayItem) => {
					formData.append(key, arrayItem);
				});
		} else if (typeof value === "object" && value !== null) {
			setValuesToFormData(formData, value, key);
		} else {
			const displayKey = prefix ? `${prefix}${capitalizeFirstLetter(key)}` : key;
			formData.append(displayKey, value);
		}
	});
}

@UntilDestroy()
@Component({
	selector: "b2b-auth-register-google-account",
	templateUrl: "./auth-register-google-account.component.html",
	styleUrls: ["./auth-register-google-account.component.scss"],
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
export class AuthRegisterGoogleAccountComponent implements OnInit {
	public readonly formGroup: FormGroup = this.getFormGroup();
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;
	public readonly b2bNgxSelectThemeEnum: typeof B2bNgxSelectThemeEnum;

	public readonly categories$: Observable<any>;
	public user;
	public token;
	public isComplete = false;
	public readonly roles$: Observable<any>;
	public availableRoles: any[];

	public registrationSystem;
	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly router: Router,
		private readonly changeDetectorRef: ChangeDetectorRef,
		private readonly _categoriesService: CategoriesService,
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _authService: AuthService,
		private readonly _translocoService: TranslocoService,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly _userService: UserService,
		private readonly _authStore: AuthStore,
		private readonly _ampService: AmplitudeService,
	) {
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
		this.b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;

		this.categories$ = this.getCategories();
		this.roles$ = this.getRoles();
		this._ampService.logEvent("View registration page 2", { source: localStorage.getItem("source") });
	}

	@HostListener("window:popstate", ["$event"])
	onPopState(event) {
		this.redirectFrom();
	}

	public getRoles() {
		return this._authService.getRoles().pipe(
			map((roles) =>
				roles.map((role) => {
					const roleName = this._translocoService.translate(`ROLES.${role.name.toUpperCase()}_NAME`);

					return {
						...role,
						description: this._translocoService.translate(`ROLES.${role.name.toUpperCase()}`),
						displayName: roleName.charAt(0).toUpperCase() + roleName.slice(1),
					};
				})
			),
			tap((roles) => (this.availableRoles = roles))
		);
	}

	async redirectFrom() {
		if (!this.isComplete) {
			await this._userService.deleteUser().toPromise();
			await this._authService.logOut();
		}
		window.location.href = "/";
	}

	public get showBadge() {
		return this._translocoService.getActiveLang() !== "en";
	}

	public getCategories() {
		return this._categoriesService.getCategories().pipe(
			map(({ categories }) =>
				categories.map((category) => ({
					text: category.name + "hide",
					value: category._id,
					collapsed: true,
					checked: false,
					children: category.children.map((level2Category) => ({
						text: level2Category.name,
						value: level2Category._id,
						collapsed: true,
						checked: false,
					})),
				}))
			)
		);
	}

	public get isTrader() {
		if (!this._authService.role) {
			return;
		}
		return this._authService.role.name === "trader";
	}

	public get emailError() {
		const { errors, touched } = this.formGroup.getControl("email");

		if (!errors || !touched) {
			return "";
		}

		return Object.keys(errors)[0];
	}

	getFormGroup() {
		return this.formBuilder.group({
			preferences: [[]],
			company: ["", [Validators.required, onlyLatinAndNumber()]],
			fullName: ["", [Validators.required, fullName(), onlyLatin()]],
			phone: ["", [Validators.required]],
			termsAndConditions: [null, Validators.requiredTrue],
			roleId: [null, Validators.required],
		});
	}

	ngOnInit() {
		this._activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
			const { token, role } = params;
			this._authService.updateToken(token);
			this._authService.initUser();
			this._authService
				.getUser()
				.pipe(untilDestroyed(this))
				.subscribe((user) => {
					this.user = user;
					this.token = token;

					this._authService.updateToken(token);
					this._authService.updateRole(role);
					this.router.navigate(['/auth/register']);
					this._authService.isRegisteredByGoogle.next(true);
					this.changeDetectorRef.detectChanges();
				});
		});
	}
}
