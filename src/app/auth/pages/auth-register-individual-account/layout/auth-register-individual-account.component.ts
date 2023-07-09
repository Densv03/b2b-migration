import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { NavigationStart, Router } from "@angular/router";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { TranslocoService } from "@ngneat/transloco";
import { animate, style, transition, trigger } from "@angular/animations";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import {environment} from "../../../../../environments/environment";

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
	) {
		this.b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

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
		document.location.href = `${environment.apiUrl}auth/google`;
	}

	registerWithLinkedIn() {
		document.location.href = `${environment.apiUrl}auth/linkedin`;
	}

	private initSocialAuthButtons(): void {
		this.router.events
			.pipe(
				filter((event: any) => event instanceof NavigationStart),
				tap((event: NavigationStart) => this.isSocialAuthButtonsVisibleSource.next(event.url.includes("first-step")))
			)
			.subscribe();
	}
}
