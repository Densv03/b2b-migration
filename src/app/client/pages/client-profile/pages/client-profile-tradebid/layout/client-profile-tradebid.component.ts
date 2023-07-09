import { Component, OnInit } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { ActivatedRoute, NavigationStart, Router, RouterEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
	selector: "b2b-client-profile-tradebid",
	templateUrl: "./client-profile-tradebid.component.html",
	styleUrls: ["./client-profile-tradebid.component.scss"],
})
export class ClientProfileTradebidComponent implements OnInit {
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	private activeBtnType: BehaviorSubject<string> = new BehaviorSubject<string>("");

	constructor(private router: Router) {
		this.activeBtnType.next(this.router.url.split("/").at(-1));
	}

	ngOnInit() {
		this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe((el: any) => {
			el.url.includes("quotation") ? this.activeBtnType.next("my-quotation") : this.activeBtnType.next("my-rfq");
		});
	}

	public getActiveBtnType(): string {
		return this.activeBtnType.value;
	}
}
