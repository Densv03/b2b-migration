import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { NavigationStart, Router } from "@angular/router";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { TranslocoService } from "@ngneat/transloco";
import { AmplitudeService } from "apps/site/src/app/core/services/amplitude/amplitude.service";
import { environment } from "apps/site/src/environments/environment.prod";
import { animate, style, transition, trigger } from "@angular/animations";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";

@UntilDestroy()
@Component({
	selector: "b2b-auth-register-individual-account",
	templateUrl: "./auth-register-individual-account.component.html",
	styleUrls: ["./auth-register-individual-account.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
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
export class AuthRegisterIndividualAccountComponent implements OnInit {
	public readonly b2bNgxLinkThemeEnum: typeof B2bNgxLinkThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	private isSocialAuthButtonsVisibleSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(
		private readonly router: Router,
		private readonly _translocoService: TranslocoService,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly _ampService: AmplitudeService
	) {
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

		this._ampService.logEvent("View registration page 1", {
			type: "Sign up",
			source: localStorage.getItem("source"),
		});
	}

	public get isSocialAuthButtonsVisible$(): Observable<boolean> {
		return this.isSocialAuthButtonsVisibleSource.asObservable();
	}

	ngOnInit() {
		this.isSocialAuthButtonsVisibleSource.next(this.router.url.includes("first-step"));
		this.initSocialAuthButtons();
	}

	public get showBadge() {
		return this._translocoService.getActiveLang() !== "en";
	}

	registerWithGoogle() {
		this._ampService.logEvent("Click Google registration button", { source: localStorage.getItem("source") });
		this._ampService.logEvent("Registration startes", { type: "google", source: localStorage.getItem("source") });

		document.location.href = `${environment.apiUrl}auth/google`;
	}

	registerWithLinkedIn() {
		document.location.href = `${environment.apiUrl}auth/linkedin`;
	}

	processSignInClick() {
		this._ampService.logEvent("Click Log in button");
		this._ampService.logEvent("View login page", {
			type: "Log in",
			source: localStorage.getItem("source"),
		});
	}

	private initSocialAuthButtons(): void {
		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationStart),
				tap((event: NavigationStart) => this.isSocialAuthButtonsVisibleSource.next(event.url.includes("first-step")))
			)
			.subscribe();
	}
}
