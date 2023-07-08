import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	HostListener,
	Input,
	OnInit,
	Output,
	ViewChild,
} from "@angular/core";
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent} from "@angular/router";
import {BehaviorSubject, Observable, of} from "rxjs";
import {filter, map, skip} from "rxjs/operators";
import {B2bNgxLinkService, B2bNgxLinkThemeEnum} from "@b2b/ngx-link";
import {SocketService} from "../../services/socket/socket.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {I18nService} from "../../../core/services/i18n/i18n.service";
// import {CookieService} from "ngx-cookie-service";
import {snakeCase} from "../../../core/helpers/function/snake-case";
// import {TranslocoService} from "@ngneat/transloco";
import {B2bNgxSelectComponent} from "@b2b/ngx-select";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {UserService} from "../../pages/client-profile/services/user/user.service";
import {FormControl} from "@angular/forms";

@UntilDestroy()
@Component({
	selector: "b2b-client-header",
	templateUrl: "./client-header.component.html",
	styleUrls: ["./client-header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientHeaderComponent implements OnInit {
	@Output() public burgerClicked: EventEmitter<any>;

	@Input() public headerLinks: any[] = [];
	@Input() public options: any[] = [];
	@Input() public className: string = '';
	@Input() public user: any;

	public readonly b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public readonly isHomePage: any;
	public readonly formControl: FormControl;
	public readonly linkDropdown: FormControl;
	public headerLinks$: Observable<any> = of([]);
	public addOfferUrl: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public makeRfqUrl: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public addProductUrl: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private isAuthPageSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isAuthPage$: Observable<boolean> = this.isAuthPageSource.asObservable();
	public isAuth$: Observable<boolean> = of(false);
	public rootRole$: Observable<boolean> = of(false);

	constructor(
		private readonly router: Router,
		private readonly socketService: SocketService,
		private readonly i18nService: I18nService,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		// private readonly cookieService: CookieService,
		// private readonly translocoService: TranslocoService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly authService: AuthService,
		private readonly userService: UserService
	) {
		this.burgerClicked = new EventEmitter();
		this.formControl = new FormControl(this.router.url.includes("ru") ? "ru" : "en");
		this.linkDropdown = new FormControl(null);
	}

	public ngOnInit(): void {
		this.checkIsAuthPage();
		this.checkUser();
		this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe((el: any) => {
			el.url.includes("offers") ? this.addOfferUrl.next(true) : this.addOfferUrl.next(false);
			el.url.includes("tradebid/listing") ? this.makeRfqUrl.next(true) : this.makeRfqUrl.next(false);
			el.url.includes("b2bmarket") ? this.addProductUrl.next(true) : this.addProductUrl.next(false);
		});

		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
			this.checkIsAuthPage();
		});

		this.router.url.includes("offers") ? this.addOfferUrl.next(true) : this.addOfferUrl.next(false);
		this.router.url.includes("tradebid/listing") ? this.makeRfqUrl.next(true) : this.makeRfqUrl.next(false);
		this.router.url.includes("b2bmarket") ? this.addProductUrl.next(true) : this.addProductUrl.next(false);

		this.i18nService.setActiveLang(this.formControl.value);
		this.b2bNgxLinkService.setLanguage(this.formControl.value);
		this.headerLinks$ = this.getHeaderLinksObservable(this.headerLinks);

		this.formControl.valueChanges.pipe(untilDestroyed(this), skip(1)).subscribe(async (lang) => {
			const routerUrl = this.router.url.replace("/ru", "").replace("/en", "");

			this.i18nService.setActiveLang(lang);
			this.b2bNgxLinkService.setLanguage(lang);
			// this.cookieService.set("lang", lang);

			await this.router.navigateByUrl(this.b2bNgxLinkService.lang + this.b2bNgxLinkService.getUrl(routerUrl));
		});

		// const langFromCookies = this.cookieService.get("lang");

		const browserLanguage = ["en", "ru"].find((language) => navigator.language.includes(language)) || "en";

		// if (langFromCookies) {
		// 	if (langFromCookies !== this.formControl.value) {
		// 		this.formControl.setValue(langFromCookies);
		// 	}
		// } else if (navigator.language && browserLanguage !== this.formControl.value) {
		// 	this.formControl.setValue(browserLanguage);
		// }
	}

	public get unreadMessagesCount$(): Observable<any> {
		return this.socketService.unreadMessagesCount$;
	}

	public emitBurgerClick(): void {
		this.burgerClicked.emit();
	}

	public processRouteClick(link: string): void {
		if (link !== "/latest-offers") {
			return;
		}

		// this.ampService.logEvent("Click on latest offers");
	}

	public processSignUpClick(): void {
		// this.ampService.logEvent("Click sign up button");
	}

	public processSignInClick(): void {
		// this.ampService.logEvent("Click sign in button");
		// this.ampService.logEvent("View login page", {
		// 	type: "Sign in",
		// 	source: localStorage.getItem("source"),
		// });
	}

	public navigateLink(link: string): void {
		if (link !== undefined) {
			this.router.navigate([link.link]);
			this.b2bNgxSelectComponent.clearSelect();
		}
	}

	@HostListener("window:scroll", ["$event"])
	private onWindowScroll(): void {
		const element = document.querySelector("header") as HTMLElement;

		if (window.pageYOffset > 0) {
			element.classList.remove("transparent");
		} else {
			element.classList.add("transparent");
		}
	}

	private getHeaderLinksObservable(headerLinks: any[]): Observable<any> {
		return of(headerLinks).pipe(
			map((links) => {
				return links.map((link) => {
					return {...link};
				});
			})
		);
	}

	private checkUser(): void {
		this.userService.getUser$().pipe(
			untilDestroyed(this)
		)
			.subscribe((user) => {
				this.isAuth$ = of(!!user);
				this.rootRole$ = of(user?.rootRole?.name === "supplier");
			});
	}

	@ViewChild(B2bNgxSelectComponent)
	private b2bNgxSelectComponent!: B2bNgxSelectComponent;

	public goTo(link: string): void {
		this.router.navigate([link]);
	}

	private checkIsAuthPage(): void {
		this.isAuthPageSource.next(this.router.url.includes('auth'));
	}
}
