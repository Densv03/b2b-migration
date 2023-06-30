import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";
import {B2bNgxLinkThemeEnum} from "../enums";
import {B2bNgxLinkService} from "../services";
// TODO: uncomment code below when libs will be inserted in b2b
// import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

// @UntilDestroy()
@Component({
	selector: "b2b-ngx-link",
	templateUrl: "./ngx-link.component.html",
	styleUrls: ["./ngx-link.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2bNgxLinkComponent implements OnInit, OnChanges {
	@Input() link: string = '';
	@Input() className: string = '';
	@Input() theme: B2bNgxLinkThemeEnum = B2bNgxLinkThemeEnum.OUTLINE_WHITE;
	@Input() routerLinkActive = "active";

	public routerLink: string = '';

	constructor(
		private readonly _b2bNgxLinkService: B2bNgxLinkService,
		private readonly _changeDetectorRef: ChangeDetectorRef
	) {}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['link']) {
			this._b2bNgxLinkService.setLanguage(this._b2bNgxLinkService.lang);
		}
	}

	ngOnInit() {
		this._b2bNgxLinkService.lang$.pipe().subscribe((lang) => {
			this.routerLink = `/${lang}${this.link}`;

			this._changeDetectorRef.detectChanges();
		});
	}
}
