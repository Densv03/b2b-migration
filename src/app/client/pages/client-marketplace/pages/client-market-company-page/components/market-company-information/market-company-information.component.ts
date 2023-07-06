import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Inject,
	Input,
	OnInit,
	ViewChild,
} from "@angular/core";
import { PublicCompanyInfoModel } from "../../../../../../../core/models/public-company-info.model";
import { B2bNgxLinkThemeEnum } from "@b2b/ngx-link";
import { CompanyKeyInfoModel } from "./models/company-key-info.model";
import { getName } from "country-list";
import { CategoryListingService } from "../../../category-listing/category-listing.service";
import { Observable, combineLatest, from, BehaviorSubject, lastValueFrom, firstValueFrom } from "rxjs";
import { ClientOfferDocumentComponent } from "../../../../../client-offer/components/client-offer-document/client-offer-document.component";
import { DialogService } from "@ngneat/dialog";
import { environment } from "../../../../../../../../environments/environment";
import { GetUrlExtension } from "../../../../../../../core/helpers/function/get-url-extension";
import { ImageExtensions } from "../../../../../../../core/add-offer/image-extensions";
import { DocumentExtensions } from "../../../../../../../core/add-offer/document-extensions";
import { DocumentPreviewModel } from "../../../../../../../core/models/document-preview.model";
import { DocumentModel } from "../../../../../../../core/models/document.model";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { AuthService } from "../../../../../../../auth/services/auth/auth.service";
import { map } from "rxjs/operators";
import { DOCUMENT } from "@angular/common";
import { websiteProtocolRegex, websiteRegex } from "../../../../../../../core/helpers/validator/site-link";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
	selector: "b2b-market-company-information",
	templateUrl: "./market-company-information.component.html",
	styleUrls: ["./market-company-information.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketCompanyInformationComponent implements OnInit {
	@Input() companyInfo: PublicCompanyInfoModel;
	@ViewChild("documentEl") documentEl: ElementRef;

	public b2bNgxLinkTheme = B2bNgxLinkThemeEnum;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public keyCompanyInfo: Promise<CompanyKeyInfoModel[]>;
	public companyCategories$: Observable<string[]>;
	public modifiedDocuments: DocumentPreviewModel[];
	public viewAllMode: boolean = false;
	public socialLinksArePresent: boolean;
	public isAuth$ = this.authService.user$.pipe(map((user) => !!user));

	private businessTypeSource: BehaviorSubject<string> = new BehaviorSubject<string>("");

	constructor(
		private categoryService: CategoryListingService,
		private dialogService: DialogService,
		private changeDetectorRef: ChangeDetectorRef,
		private authService: AuthService,
		@Inject(DOCUMENT) private document: any
	) {}

	ngOnInit(): void {
		this.updateBusinessType();
		this.keyCompanyInfo = this.generateKeyCompanyInfo();
		this.companyCategories$ = this.generateCategoriesArr();
		this.modifiedDocuments = this.generatePreviewDocumentsArr();
		this.socialLinksArePresent = this.detectSocialLinks();
	}

	public checkCompanySiteForValid(site: string): string {
		if (!site.match(websiteProtocolRegex)) {
			return site.replace(site, "https://" + site);
		}
		return site;
	}

	public calculateAllDocumentsHeight(): string {
		if (!this.documentEl?.nativeElement) return "0px";
		return this.documentEl.nativeElement.offsetHeight * this.modifiedDocuments.length + "px";
	}

	public calculateFirstDocumentsHeight(): string {
		return 43 * this.modifiedDocuments.length + "px";
	}

	public openDocument(document: DocumentModel) {
		this.dialogService.open(ClientOfferDocumentComponent, {
			data: document,
			width: "80vw",
			height: "80vh",
		});
	}

	private detectSocialLinks(): boolean {
		const {
			website,
			socialMedia: { instagram, facebook, twitter, linkedin },
		} = this.companyInfo;
		return !!(website || instagram || facebook || twitter || linkedin);
	}

	private async generateKeyCompanyInfo(): Promise<CompanyKeyInfoModel[]> {
		const { employeesNumber, yearOfFoundation, country, businessType } = this.companyInfo;
		return [
			{
				value: employeesNumber,
				icon: "croud",
				label: "Workers amount",
			},
			{
				value: yearOfFoundation,
				icon: "flag",
				label: "Year esteblished",
			},
			{
				value: getName(country),
				icon: "geo",
				label: "Country",
			},
			{
				value: await firstValueFrom(this.businessTypeSource),
				icon: "business-type",
				label: "Business type",
			},
		];
	}

	private generateCategoriesArr(): Observable<string[]> {
		return this.categoryService.getCategoryNamesArr(this.companyInfo.categories);
	}

	private generatePreviewDocumentsArr(): DocumentPreviewModel[] {
		return this.companyInfo.documents.map((document) => ({
			...document,
			size: this.formatBytes(document.size),
			fullPath: environment.apiUrl + document.path,
			extension: GetUrlExtension(document.path),
			isImage: ImageExtensions.includes(GetUrlExtension(document.path)),
			isDocument: DocumentExtensions.includes(GetUrlExtension(document.path)),
		}));
	}

	private formatBytes(bytes: string | number, decimals = 2): string {
		if (!+bytes) return "0 Bytes";

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

		const i = Math.floor(Math.log(+bytes) / Math.log(k));

		return `${parseFloat((+bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
	}

	private updateBusinessType(): void {
		combineLatest([from([this.companyInfo]), this.authService.getRoles()])
			.pipe(untilDestroyed(this))
			.subscribe(([companyInfo, roles]) => {
				const foundRoleById = roles.find((role) => role._id === companyInfo.businessType);

				if (foundRoleById) {
					this.businessTypeSource.next(foundRoleById.displayName);
				} else {
					this.businessTypeSource.next(companyInfo.businessType);
				}
			});
	}
}
