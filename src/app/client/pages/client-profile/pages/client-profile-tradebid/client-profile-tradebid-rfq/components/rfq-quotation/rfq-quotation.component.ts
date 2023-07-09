import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {HotToastService} from "@ngneat/hot-toast";

import {BehaviorSubject, Observable} from "rxjs";
import {tap, switchMap, first, map} from "rxjs/operators";

import {B2bNgxButtonThemeEnum} from "@b2b/ngx-button";
import {B2bNgxInputThemeEnum} from "@b2b/ngx-input";
import {B2bNgxSelectThemeEnum} from "@b2b/ngx-select";

import {onlyNumber} from "../../../../../../../../core/helpers/validator/only-number";
import {TradebidService} from "../../../../../../client-tradebid/tradebid.service";
import {CategoriesService} from "../../../../../../../services/categories/categories.service";
import {capitalizeFirstLetter} from "../../../../../../../../core/helpers/function/capitalize-first-letter";
import {UserService} from "../../../../../services/user/user.service";
import {UnitsService} from "../../../../../../../services/units/units.service";
import {onlyLatin} from "../../../../../../../../core/helpers/validator/only-latin";
import {animate, style, transition, trigger} from "@angular/animations";
import {onlyLatinAndNumber} from "../../../../../../../../core/helpers/validator/only-latin-and-number";
import {ClientProfileTradebidService} from "../../../client-profile-tradebid.service";

interface SelectItem {
  value: string;
  id: string;
}

@UntilDestroy()
@Component({
  selector: "b2b-rfq-quotation",
  templateUrl: "./rfq-quotation.component.html",
  styleUrls: ["./rfq-quotation.component.scss"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(500, style({opacity: 1})),
      ]),
      transition(":leave", [
        // :leave is alias to '* => void'
        animate(500, style({opacity: 0})),
      ]),
    ]),
  ],
})
export class RfqQuotationComponent implements OnInit {
  public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
  public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
  public b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;

  public form: FormGroup;

  public tradeTerms$: Observable<SelectItem[]>;
  public productionYear$: Observable<SelectItem[]>;
  public foundationYear$: Observable<SelectItem[]>;
  public businessType$: Observable<SelectItem[]>;
  public showProductionYear: boolean = true;
  public unit$: Observable<any>;
  public showCustomUnitInput$: Observable<boolean>;
  public isFileLabelVisible: boolean = true;

  public isSubmitEnabled: boolean = false;

  private readonly rfqId: string;
  private productionOrCropsYearSource: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private businessTypesArr: string[] = [
    "Manufacturer",
    "Exporter",
    "Trader",
    "Broker",
    "Farming company",
    "Supplier",
    "Etc.",
  ];

  constructor(
    private formBuilder: FormBuilder,
    private tradeBidService: TradebidService,
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private changeDetectionRef: ChangeDetectorRef,
    private hotToastService: HotToastService,
    private userService: UserService,
    private unitsService: UnitsService,
    private profileTradebidService: ClientProfileTradebidService
  ) {
    this.rfqId = this.route.snapshot.params['id'];
    this.form = this.formBuilder.group({
      quotationForm: this.createQuotationFromGroup(),
    });

    this.tradeTerms$ = this.getTradeTerms().pipe(
      tap((options) => {
        this.form.patchValue({
          quotationForm: {
            price: {
              tradeTerms: options[0].value,
            },
          },
        });
      }),
      first()
    );

    this.productionYear$ = this.getProductionYear();
    this.foundationYear$ = this.getFoundationYear();
    this.businessType$ = this.getBusinessType();
    this.unit$ = this.unitsService.getUnits().pipe(map((data) => [...data, {displayName: "Other"}]));

    // @ts-ignore
    this.showCustomUnitInput$ = this.form.get("quotationForm").get("unit")
      .valueChanges.pipe(map((data) => data === "Other"));
  }

  get productionOrCropsYear$(): Observable<string> {
    return this.productionOrCropsYearSource.asObservable();
  }

  public ngOnInit(): void {
    // @ts-ignore
    this.form.get("quotationForm").get("photos")
      .valueChanges.subscribe((data) => {
      this.isFileLabelVisible = !(typeof data === "object" && data.length > 0);
    });
    this.tradeBidService
      .getRfqByIdAdmin(this.rfqId)
      .pipe(
        switchMap((rfq) => this.categoriesService.getCategoryNameById(rfq.category)),
        untilDestroyed(this)
      )
      .subscribe((categoryName) => {
        this.showProductionYear = categoryName === "Agricultural";
        categoryName === "Agricultural"
          ? this.productionOrCropsYearSource.next("Crops year")
          : this.productionOrCropsYearSource.next("Production year");
      });

    this.form.valueChanges.subscribe((form) =>
      this.form.status === "VALID" ? (this.isSubmitEnabled = false) : (this.isSubmitEnabled = true)
    );
    this.patchValueToForm();
  }

  public addValidator(e: any): void {
    if (e?.displayName === "Other") {
      // @ts-ignore
      this.form.get("quotationForm").get("otherUnit").setValidators([Validators.required, onlyLatinAndNumber()]);
      // @ts-ignore
      this.form.get("quotationForm").get("otherUnit").updateValueAndValidity();
    } else {
      // @ts-ignore
      this.form.get("quotationForm").get("otherUnit").clearValidators();
      // @ts-ignore
      this.form.get("quotationForm").get("otherUnit").updateValueAndValidity();
    }
  }

  public patchValueToForm(): void {
    this.tradeBidService.getRfqByIdAdmin(this.rfqId).subscribe((el) => {
      this.form.patchValue({
        quotationForm: {
          productName: el?.productName,
          specifications: el?.specifications,
          productionYear: el?.productionYear,
          price: {
            price: el?.price,
            tradeTerms: el?.tradeTerms,
          },
          unit: el?.unit,
          otherUnit: el?.otherUnit,
          moreInformation: el?.moreInformation,
          photos: el?.photos,
        },
      });
    });
  }

  public submitForm(form: FormGroup): void {
    const body = this.getBodyRequest(form);
    this.profileTradebidService.editItem(body).subscribe({
      error: () => this.form.reset(),
      complete: () => this.router.navigate(["/profile/tradebid/my-rfq"]),
    });
  }

  private createQuotationFromGroup(): FormGroup {
    return this.formBuilder.group({
      productName: [null, [Validators.required, onlyLatin()]],
      specifications: [null, [Validators.required, onlyLatin()]],
      productionYear: [null, [Validators.required]],
      price: this.formBuilder.group({
        price: [null, [Validators.required, onlyNumber()]],
        tradeTerms: [null, [Validators.required]],
      }),
      unit: [null, [Validators.required]],
      otherUnit: [null],
      moreInformation: [null, [Validators.required, Validators.minLength(20), onlyLatinAndNumber()]],
      photos: [[], [Validators.required]],
    });
  }

  private createSuppliersCompanyInfo(): FormGroup {
    return this.formBuilder.group({
      companyName: [null, [Validators.required, onlyLatin()]],
      country: [null, [Validators.required]],
      website: [null, [Validators.required, onlyLatinAndNumber()]],
      foundationYear: [null, [Validators.required]],
      businessType: [null, [Validators.required]],
      companyDescription: [null, [Validators.required, onlyLatinAndNumber()]],
      contactPerson: [null, [Validators.required, onlyLatin()]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      whatsapp: [false],
      telegram: [false],
    });
  }

  private getBodyRequest(form: FormGroup): any {
    const quotationForm = form.value.quotationForm;
    return {
      productName: quotationForm.productName,
      specification: quotationForm.specifications,
      year: quotationForm.productionYear,
      priceOffer: quotationForm.price.price,
      tradeTerms: quotationForm.price.tradeTerms,
      unitMeasure: quotationForm.unit || quotationForm.otherUnit,
      moreInformation: quotationForm.moreInformation,
      rfqId: this.rfqId,
      photos: quotationForm.photos,
    };
  }

  private getTradeTerms(): Observable<SelectItem[]> {
    return this.tradeBidService.getObservableForSelect([
      "FCA",
      "EXW",
      "CPT",
      "CIP",
      "DAP",
      "DPU",
      "DDP",
      "FAS",
      "FOB",
      "CFR",
      "CIF",
    ]);
  }

  private getProductionYear(): Observable<SelectItem[]> {
    const yearsArr: string[] = ["Production against order"];
    const currentYear: number = new Date(Date.now()).getFullYear();
    for (let i = currentYear; i > currentYear - 100; i--) yearsArr.push(i.toString());
    return this.tradeBidService.getObservableForSelect(yearsArr);
  }

  private getFoundationYear(): Observable<SelectItem[]> {
    const yearsArr: string[] = [];
    const currentYear: number = new Date(Date.now()).getFullYear();
    for (let i = currentYear; i > currentYear - 200; i--) yearsArr.push(i.toString());
    return this.tradeBidService.getObservableForSelect(yearsArr);
  }

  private getBusinessType(): Observable<SelectItem[]> {
    return this.tradeBidService.getObservableForSelect(this.businessTypesArr);
  }

  private getFormData(data: any): FormData {
    const formData = new FormData();

    Object.entries(data)
      .filter(([, value]) => !!value)
      .forEach(([key, value]: [string, any]) => {
        if (key === "photos" || key === "documents") {
          Array.from(value).forEach((file: any) => {
            formData.append(key, file);
          });
        } else if (Array.isArray(value)) {
          value
            .filter((arrayItem) => !!arrayItem)
            .forEach((arrayItem) => {
              formData.append(key, arrayItem);
            });
        } else if (typeof value === "object" && value) {
          for (const childKey in value) {
            const fullKey = `${key}${capitalizeFirstLetter(childKey)}`;
            formData.append(fullKey, value[childKey]);
          }
        } else {
          formData.append(key, value);
        }
      });

    return formData;
  }
}
