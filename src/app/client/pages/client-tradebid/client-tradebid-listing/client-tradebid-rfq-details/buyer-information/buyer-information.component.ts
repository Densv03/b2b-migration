import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";

import { User } from "../../../../../../core/models/user/user.model";
import * as countryList from 'country-list';
import { QuotePurchasingDialogComponent } from "../../dialogs/quote-purchasing-dialog/quote-purchasing-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../../client-profile/services/user/user.service";
import {Dialog} from "@angular/cdk/dialog";

@Component({
	selector: "b2b-buyer-information",
	templateUrl: "./buyer-information.component.html",
	styleUrls: ["./buyer-information.component.scss"],
})
export class BuyerInformationComponent implements OnInit, OnChanges {
	@Input() user: User | any;
	@Input() showBuyerInfo: boolean = true;
	@Input() phoneNumber: any = {};
	@Input() email: string = "";
	@Input() showBtn!: boolean;

	constructor(
		private readonly router: Router,
    private readonly dialog: Dialog,
		private activeRoute: ActivatedRoute,
		private userService: UserService
	) {}

	public ngOnInit(): void {}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes["user"].currentValue && !changes["user"].firstChange) {
			this.user = changes["user"].currentValue;
		}
	}

	public showDetails(): void {
		if (this.user.rfqQuotes <= 0) {
			this.dialog.open(QuotePurchasingDialogComponent);
		} else {
			this.router.navigate(["tradebid", "quotation", this.activeRoute.snapshot.params["id"]]);
		}
	}
	public getPhoneNumber(): string {
		return this.showBuyerInfo ? this.user.phone.dialCode + this.user.phone.nationalNumber : "+123456789";
	}

	public getPhoneNumberLink(): string {
		return `tel:${this.getPhoneNumber()}`;
	}

	public getEmail(): string {
		return this.showBuyerInfo ? this.user.email : "email@email.com";
	}

	public getEmailLink(): string {
		return `mailto:${this.getEmail()}`;
	}

	public getCountryNameByCode(countryCode: string): string {
		return countryCode ? countryList.getName(countryCode.toUpperCase()) : "";
	}

	public getUserImage(): string {
		if (!this.user) {
			return "";
		}

		return this?.user?.logo === "assets/images/userLogo.png" ? "plug" : this.user.logo;
	}
}
