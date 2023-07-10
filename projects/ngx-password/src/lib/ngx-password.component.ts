import {ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import {FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {passwordMainErrorsList, passwordSubErrorsList} from "./utils/errors";
import {PasswordError} from "./models/password-error";
import {animate, style, transition, trigger} from "@angular/animations";
import {first, skip} from "rxjs";
// import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

// @UntilDestroy()
@Component({
  selector: 'b2b-ngx-password',
  templateUrl: './ngx-password.component.html',
  styleUrls: ['./ngx-password.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger("fadeInOut", [
			transition(":enter", [
				// :enter is alias to 'void => *'
				style({ opacity: 0 }),
				animate(500, style({ opacity: 1 })),
			]),
			transition(":leave", [
				// :leave is alias to '* => void'
				animate(500, style({ opacity: 0 })),
			]),
		]),
	],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: NgxPasswordComponent,
		},
	],
})
export class NgxPasswordComponent implements OnInit {
	@Input() label = 'Password';
	@Input() placeholder = 'Enter password';
	@Input() errors!: {} | null;
	@Input() hidePasswordErrors = false;
	@Input() hideSubPasswordErrors = false;
	@Input() autoCompleteEnabled = true;

	public passwordIsHide = true;

	public formControl: FormControl;
	public passwordSubErrors: Array<PasswordError> = [];
	public passwordMainErrors: Array<PasswordError> = [];
	public passwordSubErrorsNames: string[];
	public passwordMainErrorsNames: string[];
	public actualMainError: any = {};

	private onChange: (value: string) => void;
	private onTouched: () => void;


	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;
  constructor() {
		this.formControl = new FormControl();
		this.onChange = () => null;
		this.onTouched = () => null;
		this.b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;

		this.passwordSubErrors = passwordSubErrorsList;
		this.passwordMainErrors = passwordMainErrorsList;

		this.passwordSubErrorsNames = this.passwordSubErrors.map(err => err.errorName);
		this.passwordMainErrorsNames = this.passwordMainErrors.map(err => err.errorName);

	}

	ngOnChanges(changes: SimpleChanges) {
		if (!changes['errors']) {
			return;
		}
		this.formControl.setErrors(changes['errors'].currentValue);

		if (changes['errors'].currentValue !== null) {
			const subErrors: any = {};
			const mainErrors: any = {};
			for (const key in changes['errors'].currentValue) {
				if (this.passwordSubErrorsNames.includes(key)) {
					subErrors[key] = changes['errors'].currentValue[key];
				} else {
					mainErrors[key] = changes['errors'].currentValue[key];
				}
			}
			this.updateSubErrorsArr(subErrors);
			this.updateMainErrorsArr(mainErrors);
		}
	}


	ngOnInit(): void {
		this.subscribeOnValueChanges();
	}

	public updateSubErrorsArr(errors: any): void {
		if (Object.keys(errors).length) {
			this.passwordSubErrors.forEach(
				err => (err.status = errors[err.errorName]));
		} else {
			this.passwordSubErrors.forEach(err => (err.status = false));
		}
	}

	public updateMainErrorsArr(errors: any): void {
		if (Object.keys(errors).length) {
			this.passwordMainErrors.forEach(
				err => (err.status = errors[err.errorName])
			);
			this.actualMainError = this.passwordMainErrors.find(err => err.status);
		} else {
			this.passwordMainErrors.forEach(err => (err.status = false));
		}
	}

	public changeInputType(): void {
		this.passwordIsHide = !this.passwordIsHide;
	}
	public registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public writeValue(value: string): void {
		this.formControl.setValue(value);
	}

	private subscribeOnValueChanges(): void {
		this.formControl.valueChanges
			// .pipe(untilDestroyed(this))
			.subscribe(value => this.onChange(value));
	}

}
