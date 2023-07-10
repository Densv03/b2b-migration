import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MakeQuoteDialogComponent } from "../dialogs/make-quote-dialog/make-quote-dialog.component";
import { TradebidService } from "../../tradebid.service";
import { ActivatedRoute, Router } from "@angular/router";
import {  first } from "rxjs/operators";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { Observable } from "rxjs";
import { User } from "../../../../../core/models/user/user.model";
import { UserService } from "../../../client-profile/services/user/user.service";
import {MatDialog} from "@angular/material/dialog";

enum UserActions {
	SHOW_DIALOG,
	REDIRECT_TO_QUOTATION_FORM,
}

@Component({
	selector: "b2b-client-tradebid-rfq-details",
	templateUrl: "./client-tradebid-rfq-details.component.html",
	styleUrls: ["./client-tradebid-rfq-details.component.scss"],
})
export class ClientTradebidRfqDetailsComponent implements OnInit {
	public rfqData: any;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public showButton: boolean = true;

	public showBuyerInfo: boolean = true;
	public user$!: Observable<User>;

	private readonly rfqId: string;
	private userAction: UserActions = UserActions.SHOW_DIALOG;

	constructor(
		private dialog: MatDialog,
		private tradeBidService: TradebidService,
		private route: ActivatedRoute,
		private router: Router,
		private changeDetectionRef: ChangeDetectorRef,
		private userService: UserService
	) {
		this.rfqId = this.route.snapshot.params["id"];
	}

	public ngOnInit(): void {
		this.tradeBidService
			.getRfqById(this.rfqId)
			.pipe(first())
			.subscribe((data) => {
				this.userService.getUser()?.fullName === data.user?.fullName ? (this.showButton = false) : null;
				this.rfqData = data;
				this.user$ = this.userService.getPublicUserInfo(this.rfqData?.user?._id);
				this.initUserActions(this.userService.getUser());

				this.showBuyerInfo = this.isContactsOpen(data, this.userService.getUser()?._id);

				this.changeDetectionRef.detectChanges();
			});
	}

	public quoteNow(): void {
		if (!this.userService.getUser()) {
			this.router.navigate(["/auth/log-in"]);
		} else if (this.userAction === UserActions.SHOW_DIALOG) {
			this.openDialog();
		} else {
			this.router.navigate(["tradebid", "quotation", this.rfqData._id]);
		}
	}

	private openDialog(): void {
    this.dialog.open(MakeQuoteDialogComponent, {
      width: '560px',
      height: '280px'
    });
	}

	private isContactsOpen(rfq: any, userId: string): boolean {
		return rfq.openedFor?.includes(userId);
	}

	private initUserActions(user: User): void {
		this.userAction = user?.rfqQuotes ? UserActions.REDIRECT_TO_QUOTATION_FORM : UserActions.SHOW_DIALOG;
	}
}
