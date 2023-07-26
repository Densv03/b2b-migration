import { Component } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { ParticipateStepModel } from "./models/participate-step.model";
import { ProgramBenefitModel } from "./models/program-benefit.model";
import { B2bNgxInputThemeEnum } from "@b2b/ngx-input";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from "../../../core/services/api/api.service";
import { Validators } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";
import { untilDestroyed } from "@ngneat/until-destroy";
import { PromotionFeatureModel } from "./models/promotion-feature.model";
import { AuthService } from "../../../auth/services/auth/auth.service";
import { Observable } from "rxjs";
import {TranslocoService} from "@ngneat/transloco";
import {ActivatedRoute} from "@angular/router";

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
  public lang: string;

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _apiService: ApiService,
		private readonly authService: AuthService,
		private readonly _hotToastrService: HotToastService,
		private readonly translocoService: TranslocoService,
		private readonly activatedRoute: ActivatedRoute
	) {
		if (this.activatedRoute.snapshot.params?.['lang']) {
      this.lang = this.activatedRoute.snapshot.params['lang'];
			this.translocoService.setActiveLang(this.activatedRoute.snapshot.params?.['lang']);
		}
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
				title: "MARKET_PROMOTION.ACCESS_FOR_SUPPLIERS",
				description: "MARKET_PROMOTION.OUR_DATABASE_OF_BUYERS",
				releaseDate: "MARKET_PROMOTION.COMING_IN_SEPTEMBER",
				photo: "market-promotion/workspace",
			},
			{
        title: "MARKET_PROMOTION.COMPANY_STATUS",
        description: "MARKET_PROMOTION.AFTER_PRE-MODERATION",
				releaseDate:  "MARKET_PROMOTION.COMING_IN_SEPTEMBER",
				photo: "market-promotion/market",
			},
			{
				title: "MARKET_PROMOTION.BRAND_PROMOTION",
				description: "MARKET_PROMOTION.YOU_WILL_BE_ABLE",
				releaseDate: "MARKET_PROMOTION.COMING_IN_OCTOBER",
				photo: "market-promotion/chart",
			},
		];
	}

	public getStepsToParticipateProgram(): ParticipateStepModel[] {
		return [
			{
				icon: "market-promotion/first-step-label",
				text: "MARKET_PROMOTION.REGISTER_AS_SUPPLIER",
			},
			{
				icon: "market-promotion/second-step-label",
				text: "MARKET_PROMOTION.PROVIDE_DETAILED_INFORMATION",
			},
			{
				icon: "market-promotion/third-step-label",
				text: "MARKET_PROMOTION.UPLOAD_PRODUCTS",
			},
		];
	}

	public getProgramBenefits(): ProgramBenefitModel[] {
		return [
			{
				title: "MARKET_PROMOTION.PROMOTE_SOCIAL_MEDIA",
				backgroundColorIsWhite: false,
				text: "MARKET_PROMOTION.TWO_YEARS"
			},
			{
				title: "MARKET_PROMOTION.PRODUCTS_WILL_INCLUDED",
				backgroundColorIsWhite: true,
				text:  "MARKET_PROMOTION.OVER_2500_NAMES"
			},
			{
				title: "MARKET_PROMOTION.WILL_BE_PRIORITIZED",
				backgroundColorIsWhite: false,
				text:"MARKET_PROMOTION.WILL_GET_NEW_LEADS"
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
