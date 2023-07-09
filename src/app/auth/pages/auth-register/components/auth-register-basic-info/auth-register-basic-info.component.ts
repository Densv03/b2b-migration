import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import {B2bNgxSelectThemeEnum} from "@b2b/ngx-select";
import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {onlyLatin} from "../../../../../core/helpers/validator/only-latin";
import {onlyLatinAndNumberAndSymbols} from "../../../../../core/helpers/validator/only -latin-numbers-symbols";
import {fullName} from "../../../../../core/helpers/validator/full-name";
import {BasicInfoInterface} from "../../models/basic-info.interface";
import {User} from "../../../../../core/models/user/user.model";

@Component({
  selector: 'b2b-auth-register-basic-info',
  templateUrl: './auth-register-basic-info.component.html',
  styleUrls: ['./auth-register-basic-info.component.scss']
})
export class AuthRegisterBasicInfoComponent {
	@Output() public basicInfo = new EventEmitter<BasicInfoInterface>();

	@Input()
	public set userValue(user: User) {
		this.user = user;
		this.getFormGroup();
	}

	public readonly b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public readonly b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public form!: FormGroup;

	private user?: User;

	constructor(private readonly fb: FormBuilder) {
	}

	public send(): void {
		this.basicInfo.emit(this.form.value);
	}

	private getFormGroup(): void {
		this.form = this.fb.group({
			fullName: [this.user?.fullName || "", [Validators.required, fullName(), onlyLatin()]],
			phone: [this.user?.phone || null, Validators.required],
			company: [this.user?.company || "", [onlyLatinAndNumberAndSymbols(), Validators.required]],
			country: [this.user?.country || null, Validators.required],
		});
	}
}
