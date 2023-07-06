import { Component } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { DialogRef } from "@ngneat/dialog";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ApiService } from "apps/site/src/app/core/services/api/api.service";

@UntilDestroy()
@Component({
	selector: "b2b-client-offer-report",
	templateUrl: "./client-offer-report.component.html",
	styleUrls: ["./client-offer-report.component.scss"],
})
export class ClientOfferReportComponent {
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	formControl: FormControl;
	isReportSend = false;

	constructor(public ref: DialogRef, private readonly _apiService: ApiService) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.formControl = new FormControl();
	}

	sendReport(ev) {
		ev.preventDefault();
		ev.stopImmediatePropagation();
		const body = {
			postId: this.ref.data._id,
			message: this.formControl.value,
		};

		this._apiService
			.post("send-user-report", body)
			.pipe(untilDestroyed(this))
			.subscribe((val) => {
				this.isReportSend = true;
			});
	}
}
