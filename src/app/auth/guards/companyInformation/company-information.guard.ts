import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TradebidService } from "../../../client/pages/client-tradebid/tradebid.service";
import { catchError, map } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class CompanyInformationGuard implements CanActivate {
	private queryParams: string[];

	constructor(private tradebidService: TradebidService, private router: Router) {
		this.queryParams = ["add-rfq", "quotation", "offer", "b2bmarket"];
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const link: string = "/tradebid/company-information";

		const splitURL = state.url.split("/");
		let blockedURL = "";
		splitURL.forEach((item) => {
			if (this.queryParams.includes(item)) {
				blockedURL = item;
			}
		});

		return this.tradebidService.getCompanyData().pipe(
			catchError(() => {
				this.tradebidService.updateCompanyInfo({ companyName: "" }).subscribe();
				return this.tradebidService.getCompanyData();
			}),
			map((companyData) => {
				const requiredFields: string[] = [
					"address",
					"annualRevenue",
					"companyDescription",
					"companyName",
					"country",
					"email",
					"employeesNumber",
					"phone",
					"position",
					"user",
					"yearOfFoundation",
				];
				if (requiredFields.some((field) => companyData[field] === undefined)) {
					this.router.navigate([link], { queryParams: { url: blockedURL } });
					return false;
				}
				for (const key in companyData) {
					if (
						(companyData[key] === null || companyData[key] === undefined || companyData[key] === "") &&
						key !== "website"
					) {
						if (blockedURL === "quotation") {
							localStorage.setItem("quotationId", state.url.split("/")[3]);
						}
						this.router.navigate([link], { queryParams: { url: blockedURL } });
						return false;
					}
					if (Array.isArray(companyData[key]) && requiredFields.includes(key)) {
						if (companyData[key].length === 0) {
							if (blockedURL === "quotation") {
								localStorage.setItem("quotationId", state.url.split("/")[3]);
							}
							this.router.navigate([link], { queryParams: { url: blockedURL } });
							return false;
						}
					}
				}
				return true;
			})
		);
	}
}
