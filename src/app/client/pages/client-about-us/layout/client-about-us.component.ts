import { Component, OnDestroy, OnInit } from "@angular/core";
import { SectionInfoEnum } from "../section-info.enum";
import { ActivatedRoute } from "@angular/router";
import { filter, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";

@Component({
	selector: "b2b-client-about-us",
	templateUrl: "./client-about-us.component.html",
	styleUrls: ["./client-about-us.component.scss"],
})
export class ClientAboutUsComponent implements OnInit, OnDestroy {
	public sectionInfoType: typeof SectionInfoEnum = SectionInfoEnum;
	public b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public activeSectionInfoType: string = this.sectionInfoType.market;
	private unsubscribe: Subject<void> = new Subject<void>();

	constructor(private activeRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.activeRoute.queryParams
			.pipe(
				filter((params) => params['sectionType']),
				takeUntil(this.unsubscribe)
			)
			.subscribe(({ sectionType }) => {
				this.activeSectionInfoType = sectionType;
			});
	}

	public changeActiveSectionType(type: SectionInfoEnum): void {
		if (this.activeSectionInfoType === type && window.innerWidth < 768) {
			this.activeSectionInfoType = this.sectionInfoType.none;
		} else {
			this.activeSectionInfoType = type;
		}
	}

	ngOnDestroy() {
		this.unsubscribe.next();
	}
}
