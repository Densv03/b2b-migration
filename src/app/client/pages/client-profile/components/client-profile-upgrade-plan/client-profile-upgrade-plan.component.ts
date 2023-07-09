import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxLinkService, B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { DialogRef } from "@ngneat/dialog";

@Component({
	selector: "b2b-client-profile-upgrade-plan",
	templateUrl: "./client-profile-upgrade-plan.component.html",
	styleUrls: ["./client-profile-upgrade-plan.component.scss"],
})
export class ClientProfileUpgradePlanComponent implements OnInit {
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public readonly b2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum;

	constructor(
		public ref: DialogRef,
		private readonly _router: Router,
		private readonly b2bNgxLinkService: B2bNgxLinkService
	) {}

	navigationToAnnualPayment() {
		this.ref.close();
		this._router.navigateByUrl(this.b2bNgxLinkService.getStaticLink("/annual-payment"));
	}

	ngOnInit(): void {}
}
