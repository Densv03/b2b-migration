import { Component, OnInit } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import { Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { filter, Observable } from "rxjs";
import { first, map, switchMap } from "rxjs/operators";

import { FormBuilder } from "@ngneat/reactive-forms";

import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AuthService } from "../../services/auth/auth.service";
import { FirstStepDataModel } from "../auth-register-individual-account/shared/first-step-data.model";
import { BrowserStorageKeysEnum } from "../../../shared/enums/browser-storage-keys.enum";

@UntilDestroy()
@Component({
	selector: "b2b-auth-register-individual-account-first-step",
	templateUrl: "./auth-register-individual-account-first-step.component.html",
	styleUrls: ["./auth-register-individual-account-first-step.component.scss"],
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
export class AuthRegisterIndividualAccountFirstStepComponent implements OnInit {
	public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	public form = this.fb.group({
		email: ["", [Validators.required, Validators.email]],
		password: ["", [Validators.required, Validators.minLength(8)]],
	});
	public isNextStepDisabled$: Observable<boolean> = this.form.status$.pipe(map((data) => data === "INVALID"));

	private parsingCompanyName: string;

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly fb: FormBuilder,
		private readonly authService: AuthService
	) {
	}

	ngOnInit(): void {
		this.detectParsingCompanyEmail();
		this.detectUrlParamsEmail();
	}

	public secondStep() {
		this.saveUserData();
		this.router.navigate(["../second-step"], {relativeTo: this.route});
	}

	private detectUrlParamsEmail(): void {
		this.route.queryParams
			.pipe(
				map(data => data.email),
				first())
			.subscribe((email: string) => {
				this.form.patchValue({
					email
				})
			})
	}

	private detectParsingCompanyEmail(): void {
		this.form
			.get("email")
			.valueChanges.pipe(
			untilDestroyed(this),
			filter(() => this.form.get("email").valid),
			switchMap((email) => {
				return this.authService.getPreregisteredCompanyInformation(email);
			})
		)
			.pipe(
				filter((data) => data.company !== undefined),
				map((data) => data.company)
			)
			.subscribe(({companyName}) => (this.parsingCompanyName = companyName));
	}

	private saveUserData(): void {
		const firstStepData: FirstStepDataModel = {
			email: this.form.value["email"],
			password: this.form.value["password"],
			companyName: this.parsingCompanyName,
		};

		localStorage.setItem(BrowserStorageKeysEnum.FIRST_STEP_DATA, JSON.stringify(firstStepData));
	}
}
