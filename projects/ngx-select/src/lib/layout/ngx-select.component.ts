import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors} from "@angular/forms";
import {B2bNgxSelectThemeEnum} from "../enums";
import {NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: "b2b-ngx-select",
  templateUrl: "./ngx-select.component.html",
  styleUrls: ["./ngx-select.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => B2bNgxSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => B2bNgxSelectComponent),
      multi: true,
    },
  ],
})
export class B2bNgxSelectComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
  @Output() public searched: EventEmitter<string>;
  @Output() public changed: EventEmitter<any>;

  @Input() public label: string = '';
  @Input() public options: any = [];
  @Input() public theme: B2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum.BACKGROUND_TRANSPARENT;
  @Input() public className: string = '';
  @Input() public placeholder!: string;
  @Input() public bindValue!: string;
  @Input() public bindLabel!: string;
  @Input() public groupBy!: string | ((value: any) => any);
  @Input() public selectableGroup: boolean = false;
  @Input() public selectableGroupAsModel: boolean = true;
  @Input() public groupValue!: any;
  @Input() public virtualScroll: boolean = false;
  @Input() public multiple: boolean = false;
  @Input() public searchable: boolean = false;
  @Input() public isOpen!: boolean;
  @Input() public minTermLength: number = 0;
  @Input() public closeOnSelect: boolean = true;

  @Input() errors?: ValidationErrors;
  @Input() touched?: boolean;

  @ViewChild(NgSelectComponent)
  private ngSelectComponent!: NgSelectComponent;

  public formControl: FormControl<string | null>;

  private onChange: (value: string | null) => void;
  private onTouched: () => void;

  constructor() {
    this.searched = new EventEmitter<string>();
    this.changed = new EventEmitter<string>();
    this.onChange = () => null;
    this.onTouched = () => null;

    this.formControl = new FormControl<string>('');

    this.bindLabel = "label";
    this.bindValue = "value";
  }

  public get selectClassName() {
    const defaultClassName = ``;

    return `${defaultClassName} ${this.theme} ${this.className}`;
  }

  public get error(): string {
    if (!this.errors) {
      return "";
    }

    const firstErrorKey = Object.keys(this.errors)[0];

    return this.errors[firstErrorKey] as string;
  }

  ngOnInit(): void {
    this.subscribeOnValueChanges();
  }

  ngOnChanges(changes: any): void {
    if (changes.errors) {
      this.formControl.setErrors(changes.errors.currentValue);
    }
  }

  public ngAfterViewInit(): void {
    // console.log(this.ngSelectComponent)
  }

  public clearSelect(): void {
    this.ngSelectComponent.handleClearClick();
  }

  public validate(): ValidationErrors | null {
    return this.formControl.errors;
  }

  public registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: string): void {
    this.formControl.setValue(value);
  }

  public emitSearch(item: any) {
    this.searched.emit(item.term);
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  public emitChange(e: any): void {
    if (e.link) this.changed.emit(e.link);
    this.changed.emit(e);
  }

  private subscribeOnValueChanges(): void {
    this.formControl.valueChanges.subscribe((value) => {
      this.onChange(value);
    });
  }

  protected readonly close = close;
}
