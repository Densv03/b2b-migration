import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxSelectThemeEnum } from "@b2b/ngx-select";
import { Validators } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ApiService } from "../../../../core/services/api/api.service";
import { HotToastService } from "@ngneat/hot-toast";
import { UserService } from "../../client-profile/services/user/user.service";
import { FormBuilder, FormGroup } from "@angular/forms";

import { getCode, getName } from "country-list";
import { TranslocoService } from "@ngneat/transloco";

@UntilDestroy()
@Component({
	selector: "b2b-client-legal-help",
	templateUrl: "./client-legal-help.component.html",
	styleUrls: ["./client-legal-help.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLegalHelpComponent implements OnInit {
	public readonly b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public readonly b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;

	public readonly formGroup: FormGroup;

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _apiService: ApiService,
		private readonly _hotToastrService: HotToastService,
		private readonly userService: UserService,
		private readonly _translocoService: TranslocoService
	) {
		this.formGroup = this.getFormGroup();
	}
	private getFormGroup() {
		return this._formBuilder.group({
			fullName: [null, Validators.required],
			email: ["", [Validators.required, Validators.email]],
			country: ["", Validators.required],
			text: [null, Validators.required],
		});
	}

	public sendMessage(formGroup: FormGroup): void {
		if (formGroup.invalid) {
			return;
		}

		this._apiService
			.post("mail/legalHelp", {
				...formGroup.value,
				country: getName(formGroup.value.country),
			})
			.pipe(
				untilDestroyed(this),
				this._hotToastrService.observe({
					loading: this._translocoService.translate("TOASTR.LOADING"),
					success: this._translocoService.translate("TOASTR.SUCCESS"),
					error: this._translocoService.translate("TOASTR.ERROR"),
				})
			)
			.subscribe(() => {});
	}

	ngOnInit(): void {
		const user = this.userService.getUser();
		this.formGroup.patchValue(user);
	}
}
