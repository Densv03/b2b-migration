import {ChangeDetectorRef, Component, Inject, OnInit} from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
// import { DialogRef } from "@ngneat/dialog";
// import { FormBuilder, FormGroup } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { skip } from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@UntilDestroy()
@Component({
	selector: "b2b-client-profile-add-offer-dialog",
	templateUrl: "./client-profile-add-offer-dialog.component.html",
	styleUrls: ["./client-profile-add-offer-dialog.component.scss"],
})
export class ClientProfileAddOfferDialogComponent implements OnInit {
	public readonly formGroup: FormGroup;
	public readonly b2bNgxButtonThemEnum: typeof B2bNgxButtonThemeEnum;

	constructor(
		public ref: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _changeDetectorRef: ChangeDetectorRef,
    @Inject(DIALOG_DATA) public data: any
	) {
		this.formGroup = this.getFormGroup();
		this.b2bNgxButtonThemEnum = B2bNgxButtonThemeEnum;
	}

	public getFormGroup() {
		return this._formBuilder.group({
			visibilityCompanyName: [false],
			visibilityContactPerson: [false],
			visibilityPhone: [false],
			visibilityEmail: [false],
			visibilityContainer: [false],
			visibilityDocuments: [false],
			visibilityAll: [false],
		});
	}

	ngOnInit(): void {
		this.formGroup.patchValue(this.data);

		this.formGroup
			.get("visibilityAll")
			.valueChanges.pipe(untilDestroyed(this), skip(1))
			.subscribe((value: any) => {
				const { visibilityAll, ...restValues } = this.formGroup.value;

				const valuesToPatch = Object.keys(restValues).reduce((obj, key) => ({ ...obj, [key]: value }), {});
				this.formGroup.patchValue(valuesToPatch);
			});

		this.formGroup.valueChanges.pipe(untilDestroyed(this)).subscribe((values: any) => {
			const { visibilityAll, ...restValues } = values;

			const isAllVisible = Object.values(restValues).every((value) => value);

			this.formGroup.get("visibilityAll").setValue(isAllVisible, { emitEvent: false });
		});
	}

	public closeDialog(save: boolean): void {
		const res = this.formGroup.value;
		delete res['visibilityAll'];
		this.ref.close({togglers: res, createOffer: save});
	}
}
