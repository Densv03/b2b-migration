import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Clipboard } from "@angular/cdk/clipboard";
import { HotToastService } from "@ngneat/hot-toast";
import { AdminManagerService } from "../shared/services/admin-manager.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { onlyNumber } from "../../../../core/helpers/validator/only-number";
import { getName } from "country-list";

@UntilDestroy()
@Component({
	selector: "b2b-admin-manager",
	templateUrl: "./admin-manager.component.html",
	styleUrls: ["./admin-manager.component.scss"],
})
export class AdminManagerComponent implements OnInit {
	public b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;
	public b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;

	public managersList: any[] = [];
	public userList: any[] = [];
	public displayedColumnsManagers: string[] = ["refId", "firstName", "lastName", "delete"];
	public displayedColumnsUsers: string[] = ["email", "registrationType", "country", "registrationDate", "company"];
	public generatedLink: string = "";
	public formGroup: FormGroup = this.formBuilder.group({
		firstName: [null, Validators.required],
		lastName: [null, Validators.required],
		url: [null, Validators.required]
	});

	public usersByRefIdGroup: FormGroup = this.formBuilder.group({
		refId: [null, [Validators.required, onlyNumber()]],
	});

	constructor(
		private formBuilder: FormBuilder,
		private clipboard: Clipboard,
		private hotToastService: HotToastService,
		private adminManagerService: AdminManagerService,
		private changeDetectionRef: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.updateManagerList();
	}

	public generateLink(formGroup: FormGroup): void {
		if (!formGroup.valid) {
			return;
		}

		this.adminManagerService
			.addManager(formGroup.value.firstName, formGroup.value.lastName, formGroup.value.url)
			.pipe(untilDestroyed(this))
			.subscribe((data) => {
				this.generatedLink = data.link;
				this.updateManagerList();
				this.changeDetectionRef.detectChanges();
			});

		this.formGroup.reset();
		this.updateManagerList();
	}

	public getUsersByRefId(formGroup: FormGroup): void {
		if (!formGroup.valid) {
			return;
		}

		this.adminManagerService.getUsersByRefId(parseInt(formGroup.value.refId)).subscribe((data) => {
			if (!data.length) {
				this.hotToastService.show("There's no users found with current refId", {
					dismissible: true,
					style: {
						border: "1px solid #3D48E6",
					},
					autoClose: true,
				});
			}

			this.userList = data[0].users;
			this.changeDetectionRef.detectChanges();
		});
	}

	public copyLink(link: string = this.generatedLink): void {
		this.clipboard.copy(link);
		this.hotToastService.show("Link copied to clipboard", {
			dismissible: true,
			style: {
				border: "1px solid #3D48E6",
			},
			autoClose: true,
		});
	}

	public deleteManager(refId: string): void {
		this.adminManagerService.deleteManagerById(refId).subscribe(() => this.updateManagerList());
	}

	public getCountryNameByCode(countryCode: string): string {
		return countryCode ? getName(countryCode) : "";
	}

	private updateManagerList(): void {
		this.adminManagerService.getManagers().subscribe((data) => {
			this.managersList = data;
			this.changeDetectionRef.detectChanges();
		});
	}
}
