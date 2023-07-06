import { ChangeDetectionStrategy, Component } from "@angular/core";
// import { NgxSmartModalService } from "ngx-smart-modal";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { HotToastRef } from "@ngneat/hot-toast";
import { B2bNgxLinkService } from "@b2b/ngx-link";

@Component({
	selector: "b2b-client-contact-us-modal",
	templateUrl: "./client-cookies-modal.component.html",
	styleUrls: ["./client-cookies-modal.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCookiesModalComponent {
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	constructor(private readonly _hotToastrRef: HotToastRef, public readonly b2bNgxLinkService: B2bNgxLinkService) {}

	public closeModal(value: any) {
		this._hotToastrRef.close({
			dismissedByAction: value,
		});
	}
}
