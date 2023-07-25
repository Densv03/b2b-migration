import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
// import { NgxSmartModalService } from "ngx-smart-modal";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { B2bNgxInputModule, B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxSelectModule, B2bNgxSelectThemeEnum } from "@b2b/ngx-select";
import { B2bNgxButtonModule, B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { Validators } from "@angular/forms";
import { ApiService } from "../../../core/services/api/api.service";
import { HotToastService } from "@ngneat/hot-toast";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { TranslocoService } from "@ngneat/transloco";
import { CommonModule } from "@angular/common";
import { B2bNgxTelModule } from "@b2b/ngx-tel";
import { B2bNgxTextareaModule } from "@b2b/ngx-textarea";

@UntilDestroy()
@Component({
	selector: "b2b-client-contact-us-modal",
	templateUrl: "./client-contact-us-modal.component.html",
	styleUrls: ["./client-contact-us-modal.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, B2bNgxSelectModule, B2bNgxInputModule, B2bNgxTelModule, B2bNgxTextareaModule, B2bNgxButtonModule]
})
export class ClientContactUsModalComponent {
	public readonly subjectOptions: any[];
	public readonly socialMedias: any[];
	public readonly formGroup: FormGroup;

	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxSelectThemeEnum: typeof B2bNgxSelectThemeEnum;

	constructor(
		// private readonly _ngxSmartModalService: NgxSmartModalService,
		private readonly _formBuilder: FormBuilder,
		private readonly _hotToastrService: HotToastService,
		private readonly _translocoService: TranslocoService,
		private readonly _apiService: ApiService
	) {
		this.subjectOptions = [
			{ label: this._translocoService.translate("CONTACT_US.SUPPORT"), value: "support" },
			{ label: this._translocoService.translate("CONTACT_US.LEGAL_HELP"), value: "legal-help" },
		];
		this.socialMedias = this.getSocialMedias();
		this.formGroup = this.getFormGroup();

		this.b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
	}

	private getFormGroup() {
		return this._formBuilder.group({
			type: [null, Validators.required],
			name: [null, Validators.required],
			email: ["", [Validators.required, Validators.email]],
			phone: ["", [Validators.required]],
			text: [null, Validators.required],
		});
	}

	public sendMessage(formGroup: FormGroup) {
		if (formGroup.invalid) {
			return;
		}

		const data = {
			...formGroup.value,
			phone: formGroup.value.phone.e164Number,
		};

		this._apiService
			.post("mail/contactUs", data)
			.pipe(
				untilDestroyed(this),
				this._hotToastrService.observe({
					loading: this._translocoService.translate("TOASTR.LOADING"),
					success: this._translocoService.translate("TOASTR.SUCCESS"),
					error: this._translocoService.translate("TOASTR.ERROR"),
				})
			)
			.subscribe(() => {
				this.closeModal();
			});
	}

	public getSocialMedias() {
		return [
			{
				icon: "facebook",
				href: "https://www.facebook.com/b2b.discount",
			},
			{
				icon: "twitter",
				href: "https://twitter.com/DiscountB2b",
			},
			{
				icon: "linkedin",
				href: "https://www.linkedin.com/company/b2b-discount",
			},
			{
				icon: "youtube",
				href: "https://www.youtube.com/channel/UCW8RdiD7Fql5RelC37WkjjA",
			},
		];
	}

	public closeModal(): void {
		// const modal = this._ngxSmartModalService.getModal("createContactModal");

		// modal.close();
	}
}
