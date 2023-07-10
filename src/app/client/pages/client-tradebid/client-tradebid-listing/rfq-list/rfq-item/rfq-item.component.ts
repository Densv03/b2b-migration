import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";

import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";

import { UserService } from "../../../../client-profile/services/user/user.service";
import { User } from "../../../../../../core/models/user/user.model";
// @ts-ignore
import { getName } from "country-list";
import { UnitsService } from "../../../../../services/units/units.service";
import { filter, first, map } from "rxjs/operators";
import { TranslocoService } from "@ngneat/transloco";

@Component({
	selector: "b2b-rfq-item",
	templateUrl: "./rfq-item.component.html",
	styleUrls: ["./rfq-item.component.scss"],
})
export class RfqItemComponent implements OnInit {
	@Input() rfqItem: any;
	public b2bNgxButtonTheme = B2bNgxButtonThemeEnum;
	public user: Partial<User> | any = {};
	public measureName: string = "";

	constructor(
		private userService: UserService,
		private changeDetectionRef: ChangeDetectorRef,
		private unitService: UnitsService,
		private translocoService: TranslocoService
	) {}

	get countryIconName(): string {
		return this.rfqItem.destination?.to.toUpperCase();
	}

	get imageName(): string {
		if (this.rfqItem.hasOwnProperty("photos") && this.rfqItem.photos.length > 0) {
			return this.rfqItem.photos[0].md;
		} else {
			return "tradebid-default";
		}
	}

	get userImage(): string {
		return this?.user?.logo === "assets/images/userLogo.png" ? "plug" : this.user.logo;
	}

	get fullName(): string {
		return this.user.fullName;
	}

	public getCountryNameByCode(countryCode?: string): string {
		return countryCode ? getName(countryCode) : "";
	}

	public ngOnInit(): void {
		this.userService.getPublicUserInfo(this.rfqItem.user).subscribe((user) => {
			this.user = user;
			this.changeDetectionRef.detectChanges();
		});

		this.initMeasureName(this.rfqItem.measure);
	}

	private initMeasureName(measure?: string): void {
		if (!measure) {
			this.measureName = "";
		} else if (/[0-9]/.test(measure)) {
			this.unitService
				.getUnits()
				.pipe(
					filter((data) => !!data?.length),
					first(),
					map((res) => {
						this.measureName = res.find((item: { _id: any; }) => item._id === this.rfqItem.measure).displayName;
					})
				)
				.subscribe(() => {
					this.changeDetectionRef.detectChanges();
				});
		} else if (/\./.test(measure)) {
			this.measureName = this.translocoService.translate(measure);
		} else {
			this.measureName = measure;
		}
	}
}
