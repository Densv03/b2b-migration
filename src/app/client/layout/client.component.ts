import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {B2bNgxLinkThemeEnum} from "@b2b/ngx-link";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../pages/client-profile/services/user/user.service";
import {combineLatest, Observable} from "rxjs";
import {first} from "rxjs/operators";
import {TradebidService} from "../pages/client-tradebid/tradebid.service";
import {SeoService} from "../../core/services/seo/seo.service";
import {AuthService} from "../../auth/services/auth/auth.service";
import {ClientMarketplaceService} from "../pages/client-marketplace/client-marketplace.service";
import {FormControl, FormGroup} from "@angular/forms";

@UntilDestroy()
@Component({
	selector: "b2b-client",
	templateUrl: "./client.component.html",
	styleUrls: ["./client.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent implements OnInit {
	public readonly options: any[];
	public readonly socialMedias: any[];
	public readonly user$: Observable<any>;
	public readonly b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;

	constructor(
		private route: ActivatedRoute,
		private userService: UserService,
		private tradebidService: TradebidService,
		private router: Router,
		private seoService: SeoService,
		private marketService: ClientMarketplaceService,
    private authService: AuthService
	) {
		this.route.queryParams.pipe(untilDestroyed(this)).subscribe((data) => {
			if (data["ref"]) {
				localStorage.removeItem("ref");
				localStorage.setItem("ref", data["ref"]);
			}
		});
		this.options = this.getOptions();
		this.socialMedias = this.getSocialMedias();
		this.user$ = this.authService.user$;
	}

	ngOnInit() {
		this.setQueryParamForAuthorizationType();
		this.seoService.addCanonicalRef();
		this.initIntercomSettings();
		this.addUserStatistics();
    this.formGroup.valueChanges.subscribe(data => {
      console.log('data from formcontrol', data)
    });

    this.formGroup.get('categories').setValue(["60a784830a04b16c574e8148", "60a784830a04b16c574e81c0"]);
	}

  public formGroup: FormGroup = new FormGroup<{categories: FormControl<string[]>}>({
    categories: new FormControl([])
  });

	public addUserStatistics(): void {
		if (!this.userService.getUser()) {
			return;
		}
		try {
			combineLatest([this.user$, this.tradebidService.getCompanyData()]).subscribe(([user, companyInfo]) => {
				const refId = parseInt(localStorage.getItem("ref") as string);
				if (user?.firstLogin && !isNaN(refId)) {
					this.userService
						.addUserStatistics({
							userId: user._id,
							email: user.email,
							refId,
							typeRegistration: user.socialAuth ? "socials" : "standard",
						})
						.pipe(untilDestroyed(this))
						.subscribe();
				}
			});
		} catch (_) {
			const {company, role, preferences, _id} = this.userService.getUser();
			this.tradebidService
				.createCompanyInfo({
					companyName: company,
					businessType: role.displayName,
					categories: preferences,
					userId: _id,
				})
				.pipe(first())
				.subscribe();
		}
	}

	public onActivate() {
		const scrollToTop = window.setInterval(() => {
			const pos = window.pageYOffset;
			if (pos > 0) {
				window.scrollTo(0, pos - 20);
			} else {
				window.clearInterval(scrollToTop);
			}
		}, 10);
	}

	public getSocialMedias() {
		return [
			{
				icon: "facebook",
				href: "https://www.facebook.com/b2b.discount",
			},
			{
				icon: "twitter",
				href: "https://twitter.com/DiscountB2b",
			},
			{
				icon: "linkedin",
				href: "https://www.linkedin.com/company/b2b-discount",
			},
			{
				icon: "youtube",
				href: "https://www.youtube.com/channel/UCW8RdiD7Fql5RelC37WkjjA",
			},
		];
	}

	public getOptions() {
		return [
			// {
			// 	label: "HEADER.HOT_IT_WORKS",
			// 	link: "/how-it-works",
			// },
			{
				label: "HEADER.UNCLAIMED_CARGO",
				link: "/latest-offers",
			},
			{
				label: "HEADER.B2BMARKET",
				link: "/b2bmarket",
			},
			{
				label: "HEADER.TRADE_BID",
				link: "/tradebid",
			},
			{
				label: "HEADER.BLOG",
				link: "/blog",
			},
			{
				label: "CONTACT_US.TITLE",
				link: "/contact-us",
			},
			{
				label: "HEADER.ABOUT_US",
				link: "/about-us",
			},
		];
	}

	private setQueryParamForAuthorizationType(): void {
		if (!this.userService.getUser()) {
			return;
		}

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: {
				signIn: this.userService.getUser().socialAuthType ?? "standard",
			},
			skipLocationChange: true,
			queryParamsHandling: "merge",
		});
	}

	private initIntercomSettings(): void {
		// this.user$.subscribe((user) => {
		// 	(window as any).Intercom("boot", {});
		// 	if (user) {
		// 		(window as any).Intercom("update", {
		// 			email: user.email,
		// 			name: user.fullName,
		// 		});
		// 	} else {
		// 		(window as any).Intercom("update");
		// 	}
		// });
	}
}
