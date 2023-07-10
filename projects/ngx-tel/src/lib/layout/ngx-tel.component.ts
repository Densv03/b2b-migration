import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
// import { FormControl } from "@ngneat/reactive-forms";

import { B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import { CountryISO, PhoneNumberFormat } from "ngx-intl-tel-input";
import { animate, style, transition, trigger } from "@angular/animations";

const placeholders: any = {
  "Bangladesh (বাংলাদেশ)": "0000-000000",
  "Peru (Perú)": "00-000000",
};

@UntilDestroy()
@Component({
  selector: "b2b-ngx-tel",
  templateUrl: "./ngx-tel.component.html",
  styleUrls: ["./ngx-tel.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => B2bNgxTelComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => B2bNgxTelComponent),
      multi: true,
    },
  ],
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2bNgxTelComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
  @Input() errors: ValidationErrors = {};
  @Input() theme: string = B2bNgxInputThemeEnum.BACKGROUND_GRAY;
  @Input() customInputStyles: string = '';

  @Input() showErrorMessage: boolean = true;

  @Input() enableAutoCountrySelect: boolean = false;
  @Input() enablePlaceholder: boolean = true;
  @Input() searchCountryFlag: boolean = true;
  @Input() separateDialCode: boolean = true;
  @Input() phoneValidation: boolean = true;
  @Input() selectedCountryISO: CountryISO = CountryISO.UnitedStates;

  @Input() defaultNumber: string = "";

  @Input() disabled: boolean = false;

  public readonly type: string = "tel";
  public phoneNumberFormat = PhoneNumberFormat;
  public placeholder: string = "";
  public readonly selectFormControl: FormControl<string | null> = new FormControl<string>("", Validators.required);
  // public readonly inputFormControl: FormControl<string> = new FormControl<string>("", [b2bNgxTel()]);
  public readonly options: any[] = [];

  public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum = B2bNgxInputThemeEnum;

  public mask: string = "";
  public invalid: boolean = false;
  public touched: boolean = false;

  private onChange: (value: string | null) => void = () => null;
  private onTouched: () => void = () => null;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  @ViewChild("phoneField") private phoneField!: any;

  ngAfterViewInit() {
    this.phoneField.disabled = this.disabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.touched = this.inputFormControl.touched || this.selectFormControl.touched;
    this.invalid = changes['errors'] && changes['errors'].currentValue;
  }

  ngOnInit(): void {
    this.subscribeOnValueChanges();
    // this.inputFormControl.setValue(this.defaultNumber, { emitEvent: false });
  }

  public validate(): ValidationErrors | null{
    return null;
  }

  private subscribeOnValueChanges(): void {
    const selectValue$ = this.selectFormControl.valueChanges;
    // const inputValue$ = this.inputFormControl.valueChanges;

    selectValue$.pipe(untilDestroyed(this)).subscribe((selectValue) => {
      this.onChange(selectValue);
      this.onTouched();
    });

    // inputValue$.pipe(untilDestroyed(this)).subscribe((inputValue) => {
    // 	this.selectFormControl.setValue(inputValue);
    // });
  }

  public changeMask(country: any): void {
    if (!country) {
      return;
    }

    const { name, dialCode } = country;

    const placeHolder = placeholders[name] || country.placeHolder;

    // this.placeholder = placeHolder.replace(`+${dialCode} `, "").replace(/[0-9]/g, "0");
    this.mask = this.placeholder;

    // this.selectFormControl.setValue(this.inputFormControl.value);
  }

  public registerOnChange(fn: (value: string| null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: any): void {
    if (!value) {
      return;
    }

    this.selectedCountryISO = value.countryCode;

    // this.inputFormControl.setValue(value.number, { emitEvent: false });
    this.selectFormControl.setValue(value.number, { emitEvent: false });

    this.changeDetectorRef.detectChanges();
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      // this.inputFormControl.disable();
    } else {
      // this.inputFormControl.enable();
    }
  }
}
