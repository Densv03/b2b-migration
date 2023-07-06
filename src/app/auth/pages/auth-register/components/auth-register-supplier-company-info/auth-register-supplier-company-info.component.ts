import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable, of } from "rxjs";
import { B2bNgxSelectThemeEnum } from "../../../../../../../../../libs/ngx-select/src";
import { B2bNgxButtonThemeEnum } from "../../../../../../../../../libs/ngx-button/src";
import { FormBuilder, FormGroup } from "@ngneat/reactive-forms";
import { AuthService } from "../../../../services/auth/auth.service";
import { TranslocoService } from "@ngneat/transloco";
import { Validators } from "@angular/forms";
import { filter, map, tap } from "rxjs/operators";
import { SelectItem } from "../../../../../client/pages/client-profile/pages/client-company-information/layout/client-company-information.component";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
	selector: "b2b-auth-register-supplier-company-info",
	templateUrl: "./auth-register-supplier-company-info.component.html",
	styleUrls: ["./auth-register-supplier-company-info.component.scss"],
})
export class AuthRegisterSupplierCompanyInfoComponent {
	@Output() public supplierCompanyInfo = new EventEmitter<any>();
	@Input() public rootRole: string;

	public readonly b2bNgxSelectThemeEnum = B2bNgxSelectThemeEnum;
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public readonly roles$: Observable<any>;
	public foundationYear$: Observable<SelectItem[]>;
	public employeesNumber$: Observable<SelectItem[]>;
	public form: FormGroup<any> = this.getFormGroup();

	private employeesNumberArr: string[] = ["1-5", "5-10", "10-50", "50-100", "> 100"];

	constructor(
		private readonly fb: FormBuilder,
		private readonly authService: AuthService,
		private readonly translocoService: TranslocoService
	) {
		this.roles$ = this.getRoles();
		this.employeesNumber$ = this.getObservableForSelect(this.employeesNumberArr);
		this.foundationYear$ = this.getFoundationYear();
	}

	public send(): void {
		this.authService
			.getRootRoles()
			.pipe(untilDestroyed(this))
			.subscribe((rootRoles) => {

				const model = {
					...this.form.value,
					rootRoleId: rootRoles.find((el) => el.name === this.rootRole)._id,
				};
				this.supplierCompanyInfo.emit(model);
			});
	}

	private getFormGroup(): FormGroup {
		return this.fb.group({
			roleId: [null, Validators.required],
			categories: [null, Validators.required],
			yearOfFoundation: ["", Validators.required],
			employeesNumber: ["", Validators.required],
		});
	}

	private getObservableForSelect(arr: string[]): Observable<SelectItem[]> {
		return of(
			arr.map((el) => {
				return {
					id: el,
					value: el,
				};
			})
		);
	}

	private getFoundationYear(): Observable<SelectItem[]> {
		const yearsArr: string[] = [];
		const currentYear: number = new Date(Date.now()).getFullYear();
		for (let i = currentYear; i > currentYear - 50; i--) yearsArr.push(i.toString());
		return this.getObservableForSelect(yearsArr);
	}

	private getRoles() {
		return this.authService.getRootRoles().pipe(
			untilDestroyed(this),
			filter((data) => !!Object.keys(data).length),
			map((roles) => {
				const buyerRolesIndex = roles.findIndex((item) => item.displayName === "Supplier");
				return roles[buyerRolesIndex].subRoles.map((role) => {
					const roleName = this.translocoService.translate(`ROLES.${role.name.toUpperCase()}_NAME`);

					return {
						...role,
						description: this.translocoService.translate(`ROLES.${role.name.toUpperCase()}`),
						displayName: roleName.charAt(0).toUpperCase() + roleName.slice(1),
					};
				});
			})
		);
	}
}
