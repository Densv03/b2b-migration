import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientTradebidComponent } from "./client-tradebid.component";
import { ClientTradeBidAddRfqComponent } from "./client-tradebid-add-rfq/client-trade-bid-add-rfq.component";
import { ClientTradebidListingComponent } from "./client-tradebid-listing/client-tradebid-listing.component";
import { AuthGuard } from "../../../auth/guards/auth/auth.guard";
import { ClientTradebidRfqDetailsComponent } from "./client-tradebid-listing/client-tradebid-rfq-details/client-tradebid-rfq-details.component";
import { ClientTradebidQuotationFormComponent } from "./client-tradebid-listing/client-tradebid-quotation-form/layout/client-tradebid-quotation-form.component";
import { CompanyInformationGuard } from "../../../auth/guards/companyInformation/company-information.guard";
import { CompanyInformationComponent } from "./company-information/company-information.component";

const routes: Routes = [
	{
		path: "",
		component: ClientTradebidComponent,
	},
	{
		path: "add-rfq",
		component: ClientTradeBidAddRfqComponent,
		canActivate: [AuthGuard, CompanyInformationGuard],
	},
	{
		path: "listing",
		component: ClientTradebidListingComponent,
	},
	{
		path: "listing/:id",
		component: ClientTradebidRfqDetailsComponent,
	},
	{
		path: "quotation/:id",
		component: ClientTradebidQuotationFormComponent,
		canActivate: [CompanyInformationGuard],
	},
	{
		path: "company-information",
		component: CompanyInformationComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [],
	declarations: [],
})
export class ClientTradebidRoutingModule {}
