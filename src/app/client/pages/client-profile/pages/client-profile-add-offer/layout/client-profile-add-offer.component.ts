import { animate, style, transition, trigger } from "@angular/animations";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest, Observable } from "rxjs";
import { filter, map, startWith, switchMap, tap } from "rxjs/operators";

import { HotToastService } from "@ngneat/hot-toast";
import { TranslocoService } from "@ngneat/transloco";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { B2bNgxLinkService } from "@b2b/ngx-link";
import { CategoriesService} from "../../../../../services/categories/categories.service";
import { OffersService} from "../../../../../services/offers/offers.service";
import { TransportTypesService} from "../../../../../services/transport-types/transport-types.service";
import { UnitsService} from "../../../../../services/units/units.service";
import { environment} from "../../../../../../../environments/environment";
import { B2bNgxSelectThemeEnum} from "@b2b/ngx-select";
import { AuthService } from "../../../../../../auth/services/auth/auth.service";
import { ClientOfferDocumentComponent } from "../../../../client-offer/components/client-offer-document/client-offer-document.component";
import { ClientProfileAddOfferDialogComponent } from "../components/client-profile-add-offer-dialog/client-profile-add-offer-dialog.component";
import { ImageExtensions } from "../../../../../../core/add-offer/image-extensions";
import { DocumentExtensions } from "../../../../../../core/add-offer/document-extensions";
import { onlyLatin } from "../../../../../../core/helpers/validator/only-latin";
import { onlyNumber } from "../../../../../../core/helpers/validator/only-number";
import { GetUrlExtension } from "../../../../../../core/helpers/function/get-url-extension";
import { onlyLatinAndNumberAndSymbols } from "../../../../../../core/helpers/validator/only -latin-numbers-symbols";
import {TradebidService} from "../../../../client-tradebid/tradebid.service";
import {getOfferFormData} from "../get-offer-form-data";
import {Dialog} from "@angular/cdk/dialog";
import {MixpanelService} from "../../../../../../core/services/mixpanel/mixpanel.service";

export function oneContainer(): ValidatorFn {
	const oneContainer = /^[^. ,]+$/;
	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}

		if (!oneContainer.test(String(control.value).toLowerCase())) {
			return { oneContainer: true };
		}

		return null;
	};
}

export function containerNumber(): ValidatorFn {
	const bulkVesselType = environment.production ? "60a784830a04b16c574e8147" : "60ba1f30445d001ecf7775b4";
	const containerNumberType = environment.production ? "60a784830a04b16c574e8146" : "60ba1f30445d001ecf7775b3";

	return (control: any): ValidationErrors | null => {
		// const transportType: any = control.parent?.controls["transportType"];
    const transportType: any = control.parent.controls.values?.transportType
		if (!transportType) {
			return null;
		}

		if (transportType && transportType.value === bulkVesselType) {
			const isValidFormat = /^\d+$/.test(control.value);
			return isValidFormat ? null : { bulkVesselFormat: true };
		}

		if (transportType && transportType.value === containerNumberType) {
			const isValidFormat = /^[a-zA-Z]{4}[0-9]+$/.test(control.value);
			return isValidFormat ? null : { containerNumberType: true };
		}

		return null;
	};
}

@UntilDestroy()
@Component({
	selector: "b2b-client-profile-add-offer",
	templateUrl: "./client-profile-add-offer.component.html",
	styleUrls: ["./client-profile-add-offer.component.scss"],
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
export class ClientProfileAddOfferComponent implements OnInit, OnDestroy, OnDestroy {
	public readonly formGroup: FormGroup;
	public readonly formState: {[key: string]: AbstractControl};
	public readonly b2bNgxButtonThemeEnum: typeof B2bNgxButtonThemeEnum;
	public readonly b2bNgxInputThemeEnum: typeof B2bNgxInputThemeEnum;
	public readonly b2bNgxSelectThemeEnum: typeof B2bNgxSelectThemeEnum;
	public readonly level1Categories$: Observable<any>;
	public readonly level2Categories$: Observable<any>;
	public readonly units$: Observable<any>;
	public readonly transportTypes$: Observable<any>;
	public isTransportTypeBulk: boolean;
	public isTransportContainer: boolean;
	public readonly offer$: Observable<any>;

	public emitEvent: boolean;
	public lastChanged: string;
	public editMode: boolean;
	public currentOfferId: string;
	public containerPlaceholder$: Observable<string>;
	public showContainerNumber$: Observable<boolean>;

	public loading = false;

	public discountChanged: boolean;
	public newPriceChanged: boolean;
	public showCancelBtn: boolean;

	constructor(
		public readonly authService: AuthService,
		private readonly _hotToastService: HotToastService,
		private readonly _formBuilder: FormBuilder,
		private readonly _categoriesService: CategoriesService,
		private readonly _unitsService: UnitsService,
		private readonly _transportTypesService: TransportTypesService,
		private readonly _offersService: OffersService,
		private readonly _router: Router,
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _changeDetectorRef: ChangeDetectorRef,
		private readonly _translocoService: TranslocoService,
		public readonly b2bNgxLinkService: B2bNgxLinkService,
		private readonly dialog: Dialog,
		private readonly tradebidService: TradebidService,
    private readonly mixpanelService: MixpanelService
	) {
		this.showCancelBtn = !!localStorage.getItem("showCancelButton");
		// this._ampService.logEvent("View add lot");
		this.formGroup = this.getFormGroup();
		this.formState = this.formGroup.controls;
		this.b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
		this.b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
		this.b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
		this.level1Categories$ = this.getLevel1Categories();
		this.level2Categories$ = this.getLevel2Categories();
		this.units$ = this.getUnits();
		this.transportTypes$ = this.getTransportTypes().pipe(
			map((transportType) =>
				transportType.map((transportType: any) => ({
					...transportType,
					displayName: this._translocoService.translate(transportType.displayName),
				}))
			)
		);
		this.offer$ = this.getOffer();
		this.containerPlaceholder$ = this.getContainerPlaceholder();
		this.showContainerNumber$ = this.formGroup?.get("transportType").valueChanges.pipe(
			// TODO: add logic for to divide prod / dev IDs
			map(
				(transportId) =>
					![
						"629493f93db39e42eb255af7",
						"629494023db39e42eb255af8",
						"629494093db39e42eb255af9",
						"629493af343a0863bc00b886",
						"629493c3343a0863bc00b887",
						"629493cb343a0863bc00b888",
					].includes(transportId)
			)
		);

		this.showContainerNumber$ = this.formGroup
			?.get("transportType")
			.valueChanges.pipe(
				map(
					(transportId) =>
						![
							"629493f93db39e42eb255af7",
							"629494023db39e42eb255af8",
							"629494093db39e42eb255af9",
							"629493af343a0863bc00b886",
							"629493c3343a0863bc00b887",
							"629493cb343a0863bc00b888",
						].includes(transportId)
				)
			);
	}

	public getContainerPlaceholder() {
		const id$ = this.formGroup.get("transportType").valueChanges.pipe(startWith(""));
		const transportTypes$ = this.getTransportTypes();

		return combineLatest([transportTypes$, id$]).pipe(
			map(([transportTypes, id]) => {
				const foundTransport = transportTypes.find((transportType: any) => transportType._id === id)?.name;

				if (!foundTransport) {
					return "";
				}

				return `PLACEHOLDERS.${foundTransport.toUpperCase()}`;
			})
		);
	}

	ngOnInit(): void {


		this.patchCompanyDataToForm();
		this.authService.showSidenav = false;
		this.checkPrices();
		this.offer$
			.pipe(
				untilDestroyed(this),
				filter((offer) => !!offer)
			)
			.subscribe((offer) => {
				this.editMode = true;
				this.updateOfferForm(offer);
			});

		this.formGroup
			.get("level1Category")
			.valueChanges.pipe(
				filter((data) => !!data),
				untilDestroyed(this)
			)
			.subscribe(() => {
				this.formGroup.get("level2Category").setValue(null);
			});

		// this.formGroup.get("container").valueChanges.pipe(untilDestroyed(this)).subscribe();
		// this.formGroup.valueChanges.pipe(untilDestroyed(this)).subscribe((val) => {
		// 	const filledFields = Object.values(val).filter((el) => el);
		//
		// 	const percentFilled = (filledFields.length * 100) / Object.values(val).length;
		// });

		const transportType$ = this.formGroup.get("transportType").valueChanges;
		combineLatest([this.transportTypes$, transportType$])
			.pipe(
				untilDestroyed(this),
				filter(([transportTypes, transportTypeId]: [any, any]) => transportTypes.length && !!transportTypeId)
			)
			.subscribe(([transportTypes, transportTypeId]) => {
				this.isTransportTypeBulk =
					transportTypes.find((transportType: any) => transportType._id === transportTypeId)?.name === "bulk_vessel";
				this.isTransportContainer =
					transportTypes.find((transportType: any) => transportType._id === transportTypeId)?.name === "container_vessel";
				this.formGroup
					.get("containerNumberType")
					.setValidators(this.isTransportTypeBulk ? [Validators.required] : null);
			});
	}


	public patchCompanyDataToForm(): void {
		this.tradebidService.getCompanyData()
			.subscribe(companyInfo => {
				const {companyName, email, phone} = companyInfo;
				this.formGroup.patchValue({
					contactCompanyName: companyName,
					contactEmail: email,
					contactPhone: phone
				})
			})
	}

	public get showBadge() {
		return this._translocoService.getActiveLang() !== "en";
	}

	public getSeaLines() {
		return this._offersService.getSeaLines();
	}

	public getOffer(): Observable<any> {
		return this._activatedRoute.paramMap.pipe(
			tap(() => {
				this.formGroup.reset(this.getFormGroup().value);
				this.editMode = false;
			}),
			map((paramMap) => paramMap.get("id")),
			filter((id) => !!id),
			switchMap((id) => this._offersService.getOfferById(id))
		);
	}

	public backToCompanyForm(): void {
		this._router.navigate(["tradebid/company-information"], { queryParams: { url: "add-rfq" } });
	}
	public reviewAndPost(formGroup: FormGroup): void {
		if (formGroup.invalid) {
			this.formGroup.markAllAsTouched();
			return;
		}

		this.loading = true;

    this.mixpanelService.track('Unclaimed cargo posted', {
      'Product Sector': formGroup.value.category,
      'Destination': formGroup.value.currentLocation
    });

		if (!this.editMode) {
			const dialogRef = this.dialog.open(ClientProfileAddOfferDialogComponent, {
				data: {
          data: formGroup.value,
          closeButton: false
        }
			});

			dialogRef.closed
				.pipe(
					tap(({togglers}: any) => {
						this.loading = false;
						this.patchToggllers(togglers);
						this._changeDetectorRef.detectChanges();
					}),
					filter(({createOffer}) => !!createOffer)
				)
				.subscribe(() => {
					// this._ampService.logEvent("Place offer");
					const { level2Category, ...data } = formGroup.value;

					const offerToCreate = {
						...data,
						category: level2Category
					};


					const offer = getOfferFormData(offerToCreate);


					this._offersService
						.createOffer(offer)
						.pipe(
							untilDestroyed(this),
							this._hotToastService.observe({
								loading: this._translocoService.translate("TOASTR.LOADING"),
								success: () => this._translocoService.translate("TOASTR.SUCCESS"),
								error: this._translocoService.translate("AUTH.INVALID_EMAIL_ADDRESS"),
							})
						)
						.subscribe((response: any) => {
							this._router.navigateByUrl(this.b2bNgxLinkService.getStaticLink(`/offers/${response._id}`));
							this.loading = false;
						});
				});
		} else {
			const data = { ...formGroup.value, category: formGroup.value.level2Category };

			const offer = getOfferFormData(data);

			this._offersService
				.updateOffer(offer, this.currentOfferId)
				.pipe(
					untilDestroyed(this),
					this._hotToastService.observe({
						loading: this._translocoService.translate("TOASTR.LOADING"),
						error: this._translocoService.translate("AUTH.INVALID_EMAIL_ADDRESS"),
            success: () => this._translocoService.translate("TOASTR.SUCCESS"),
					})
				)
				.subscribe(() => {
					this.loading = false;
				});
		}
	}

	public openDocument(ev: any): void {
		const document = this.formGroup.value.documents.find((el: any) => el._id === ev.name);

		const data = {
			fullPath: environment.apiUrl + document.path,
			extension: GetUrlExtension(document.path),
			isImage: ImageExtensions.includes(GetUrlExtension(document.path)),
			isDocument: DocumentExtensions.includes(GetUrlExtension(document.path)),
		};

		this.dialog.open(ClientOfferDocumentComponent, {
			data,
			width: "80vw",
			height: "80vh",
		});
	}

	private updateOfferForm(offer: any): void {
		this.currentOfferId = offer._id;

		this._categoriesService
			.getCategories()
			.pipe(untilDestroyed(this))
			.subscribe(({ categories }: any) => {
				let level1Category;
				let level2Category;

				for (const  firstCategory of categories) {
					if (firstCategory.children) {
						for (const secondCategory of firstCategory.children) {
							if (offer.category._id === secondCategory._id) {
								level1Category = firstCategory._id;
								level2Category = secondCategory._id;
							}
						}
					}
				}

				this.formGroup.patchValue({
					title: offer.title,
					description: offer.description,
					priceOld: offer.price?.old,
					priceNew: offer.price?.new,
					priceDiscount: offer.price?.discount,
					amount: offer.amount?.count,
					unit: offer.amount?.unit?._id,
					contactCompanyName: offer.contact?.companyName,
					contactPersonName: offer.contact?.personName,
					contactPhone: offer.contact?.phone,
					contactEmail: offer.contact?.email,
					transportType: offer.transportType?._id,
					container: offer.container,
					destinationFrom: offer.destination?.from,
					destinationTo: offer.destination?.to,
					visibilityCompanyName: offer.visibility?.companyName,
					visibilityContactPerson: offer.visibility?.contactPerson,
					visibilityPhone: offer.visibility?.phone,
					visibilityEmail: offer.visibility?.email,
					visibilityContainer: offer.visibility?.container,
					visibilityPhotos: offer.visibility?.photos,
					visibilityDocuments: offer.visibility?.documents,
					containerNumberType: offer.containerNumberType,
					level1Category,
					level2Category,
					photos: offer.photos,
					documents: offer.documents,
				});
			});
	}

	private checkPrices() {
		const priceOldControl = this.formGroup.get("priceOld");
		const priceDiscountControl = this.formGroup.get("priceDiscount");
		const priceNewControl = this.formGroup.get("priceNew");

		priceOldControl.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
			priceDiscountControl.setValue("", { emitEvent: true });
			priceNewControl.setValue("", { emitEvent: true });
		});

		priceNewControl.valueChanges
			.pipe(
				untilDestroyed(this),
				filter(() => priceOldControl.value)
			)
			.subscribe((newValue: any) => {
				this.newPriceChanged = newValue !== "";
				if (this.discountChanged) {
					this.discountChanged = false;
				}
				const newValueNumber = Number.parseInt(newValue);
				const oldValueNumber = Number.parseInt(priceOldControl.value);

				if (newValueNumber <= oldValueNumber) {
					const discount = (100 - (newValueNumber * 100) / oldValueNumber).toFixed(2);
					priceDiscountControl.setValue(discount, { emitEvent: true });
				} else {
					priceDiscountControl.setValue(0, { emitEvent: true });
				}

				priceDiscountControl.markAsTouched();
			});

		priceDiscountControl.valueChanges
			.pipe(
				untilDestroyed(this),
				filter((val) => val >= 5)
			)
			.subscribe((newValue: any) => {
				if (this.newPriceChanged && !this.discountChanged) {
					this.newPriceChanged = false;
					return;
				}
				const discount = Number.parseInt(newValue);
				const oldPrice = Number.parseInt(priceOldControl.value);
				const newPrice = (discount * oldPrice) / 100;
				this.discountChanged = true;
				priceNewControl.setValue(oldPrice - newPrice, { emitEvent: false });
			});
	}

	private getLevel2Categories() {
		return this.formGroup.get("level1Category").valueChanges.pipe(
			switchMap((id) => {
				return this._categoriesService
					.getCategories()
					.pipe(map(({ categories }) => categories.find((foundCategory: any) => foundCategory._id === id)?.children));
			})
		);
	}

	private getLevel1Categories() {
		return this._categoriesService
			.getCategories()
			.pipe(map(({ categories }) => categories.filter((category: any) => category.children.length)));
	}

	private getUnits() {
		return this._unitsService.getUnits().pipe(
			map((units: any[]) =>
				units.map((unit: any) => ({
					...unit,
					displayName: this._translocoService.translate(`UNITS.${unit.name.toUpperCase()}`),
				}))
			),
			tap((units: any) => {
				if (units.length) {
					this.formGroup.patchValue({
						unit: units[0]._id,
					});
				}
			})
		);
	}

	private getTransportTypes() {
		return this._transportTypesService.getTransportTypes();
	}

	private getFormGroup() {
		return this._formBuilder.group({
			title: [null, [Validators.required, Validators.maxLength(35), onlyLatin()]],
			description: [null, [Validators.required, onlyLatinAndNumberAndSymbols()]],
			priceOld: [null, [Validators.required, onlyNumber()]],
			priceNew: [null, [Validators.required, onlyNumber()]],
			priceDiscount: [null, [Validators.required, Validators.min(5), Validators.max(100), onlyNumber()]],
			amount: [null, [Validators.required, onlyNumber()]],
			unit: [null, Validators.required],
			contactCompanyName: [null, [Validators.required, onlyLatin()]],
			contactPersonName: [null, [Validators.required, onlyLatin()]],
			contactPhone: [null, [Validators.required]],
			contactEmail: [null, [Validators.required, Validators.email]],
			transportType: [null, Validators.required],
			container: [null, [oneContainer(), containerNumber()]],
			containerNumberType: [null],
			destinationFrom: [null, Validators.required],
			destinationTo: [null, Validators.required],
			visibilityCompanyName: [true],
			visibilityContactPerson: [true],
			visibilityPhone: [true],
			visibilityEmail: [true],
			visibilityContainer: [true],
			visibilityPhotos: [true],
			visibilityDocuments: [true],
			level1Category: [null, Validators.required],
			level2Category: [null, Validators.required],
			photos: [[], Validators.required],
			documents: [[], Validators.required],
			currentLocation: [null, Validators.required]
		});
	}

	private patchToggllers(state: {[key: string]: boolean}): void {
		for (const key in state) {
			this.formGroup.get(key).setValue(state[key])
		}
	}


	ngOnDestroy(): void {
		this.authService.showSidenav = true;
		localStorage.removeItem("showCancelButton");
	}
}
