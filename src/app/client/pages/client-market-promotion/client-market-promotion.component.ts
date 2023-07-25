import { Component, OnInit } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { ParticipateStepModel } from "./models/participate-step.model";
import { ProgramBenefitModel } from "./models/program-benefit.model";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { ApiService } from "../../../core/services/api/api.service";
import { Validators } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";
import { untilDestroyed } from "@ngneat/until-destroy";
import { PromotionFeatureModel } from "./models/promotion-feature.model";
import { AuthService } from "../../../auth/services/auth/auth.service";
import { Observable } from "rxjs";
import {FormBuilder, FormGroup} from '@angular/forms'

@Component({
	selector: "b2b-client-market-promotion",
	templateUrl: "./client-market-promotion.component.html",
	styleUrls: ["./client-market-promotion.component.scss"],
})
export class ClientMarketPromotionComponent {
	public readonly b2bNgxButtonThemeEnum = B2bNgxButtonThemeEnum;
	public readonly b2bNgxInputThemeEnum = B2bNgxInputThemeEnum;

	public readonly formGroup: FormGroup;
	public readonly user$: Observable<any>;

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _apiService: ApiService,
		private readonly authService: AuthService,
		private readonly _hotToastrService: HotToastService
	) {
		this.formGroup = this.getFormGroup();
		this.user$ = this.authService.user$;
	}

	public scrollToBlock(el: HTMLElement) {
		el.scrollIntoView({ behavior: "smooth" });
	}

	public sendMessage(formGroup: FormGroup) {
		if (formGroup.invalid) {
			return;
		}

		const data = {
			...formGroup.value,
			phone: formGroup.value.phone.e164Number,
		};

		this._apiService
			.post("mail/contactUs", data)
			.pipe(
				untilDestroyed(this),
				this._hotToastrService.observe({
					loading: "Processing your feedback...",
					success: "Feedback has been sent successfully",
					error: "Some error occured while sending feedback",
				})
			)
			.subscribe(() => {
				this.formGroup.reset();
			});
	}

	public getPromotionFeatures(): PromotionFeatureModel[] {
		return [
			{
				title: "Access for suppliers ",
				description:
					"To our database of buyers in their personal accounts. You won’t have to wait until a\n" +
					"\t\t\t\t\t\tbuyer contacts you. Instead, you will be able to filter buyers by their preferences and location, and\n" +
					"\t\t\t\t\t\tcontact them directly via our built-in chat.",
				releaseDate: "Coming on August 2023.",
				photo: "market-promotion/workspace",
			},
			{
				title: "Company status and rating system",
				description: `
				After pre-moderation, you will get a few badges and a personal 
				rating to help boost trust towards your company. Your products 
				will also go to the top of the list in the catalog.\n`,
				releaseDate: "Coming in September 2023.",
				photo: "market-promotion/market",
			},
			{
				title: "Brand promotion",
				description: `
				You will be able to order bespoke ad campaigns with fully developed creative 
				content and promotion on Facebook, LinkedIn, and Google to the carefully
				 selected target audience.`,
				releaseDate: "Coming in October 2023.",
				photo: "market-promotion/chart",
			},
		];
	}

	public getStepsToParticipateProgram(): ParticipateStepModel[] {
		return [
			{
				icon: "market-promotion/first-step-label",
				text: "Register on the platform as a supplier.",
			},
			{
				icon: "market-promotion/second-step-label",
				text: "Provide detailed information \n" + " about your company.",
			},
			{
				icon: "market-promotion/third-step-label",
				text: "Upload your products \n" + "on the platform.",
			},
		];
	}

	public getProgramBenefits(): ProgramBenefitModel[] {
		return [
			{
				title: "Your products will appear in the selection of goods we’ll pay \n" + "to promote on social media.",
				backgroundColorIsWhite: false,
				text: "In the last two years, we’ve defined the perfect target audience for our ads, and you will get potential clients faster than on other marketplaces.",
			},
			{
				title: "Your products will be included in our weekly email distribution.",
				backgroundColorIsWhite: true,
				text: "We have over 25 000 names in our own database of wholesale buyers, and our partners add another 120 000 on top. We will send emails advertising your products to those who constantly buy or have bought this kind of product before.",
			},
			{
				title: "Your company’s account will be prioritized in our promotion \n" + "on search engines. ",
				backgroundColorIsWhite: false,
				text:
					"Thus, you will get new leads when your company appears in search results for those interested in buying your product.\n" +
					"The aim of our new SPP service is to attract more companies with quality goods to our platform while also helping them scale their businesses internationally and bring in new clients.",
			},
		];
	}

	private getFormGroup() {
		return this._formBuilder.group({
			name: [null, Validators.required],
			phone: ["", [Validators.required]],
			text: [null, Validators.required],
		});
	}
}
