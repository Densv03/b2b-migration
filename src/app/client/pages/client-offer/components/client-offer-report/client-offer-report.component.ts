import {Component, Inject} from "@angular/core";
import {B2bNgxButtonModule, B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ApiService} from "../../../../../core/services/api/api.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {NgIf} from "@angular/common";

@UntilDestroy()
@Component({
	selector: "b2b-client-offer-report",
	templateUrl: "./client-offer-report.component.html",
	styleUrls: ["./client-offer-report.component.scss"],
  standalone: true,
  imports: [B2bNgxButtonModule, ReactiveFormsModule, NgIf]
})
export class ClientOfferReportComponent {
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;

	public formControl: FormControl = new FormControl();
	public isReportSend = false;

  public formGroup: FormGroup = new FormGroup<any>({
    formControl: [null]
  })

	constructor(public ref: DialogRef, private readonly _apiService: ApiService, @Inject(DIALOG_DATA) public data: any) {
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	}

	sendReport(ev: any) {
		ev.preventDefault();
		ev.stopImmediatePropagation();
		const body = {
			postId: this.data._id,
			message: this.formControl.value,
		};

		this._apiService
			.post("send-user-report", body)
			.pipe(untilDestroyed(this))
			.subscribe(() => {
				this.isReportSend = true;
			});
	}
}
