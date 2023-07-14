import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientComponent } from "./layout/client.component";
import {DefaultRoleGuard} from "../auth/guards/defaultRole/deafult-role.guard";
import {AuthGuard} from "../auth/guards/auth/auth.guard";
import {ChatGuard} from "../auth/guards/chat/chat.guard";
import {CompanyInformationGuard} from "../auth/guards/companyInformation/company-information.guard";
import {BuyerGuard} from "../auth/guards/buyer/buyer.guard";

const routes: Routes = [
	{
		path: "",
		component: ClientComponent,
		// canActivate: [RegistrationSecondStepGuard],
		// canActivateChild: [MetaGuard],
		children: [
			{
				path: "",
				// canActivate: [DefaultRoleGuard],
				loadChildren: () =>
					import("../client/pages/client-home-new/client-home.module").then((m) => m.ClientHomeModule),
				data: {
					meta: {
						title: "Find new buyers or suppliers on the global platform. Resell or purchase an unclaimed cargo.",
						description: "Find new buyers or suppliers on the global platform. Resell or purchase an unclaimed cargo.",
					},
				},
			},
			// {
			// 	path: "",
			// 	canActivate: [DefaultRoleGuard],
			// 	loadChildren: () => import("./pages/client-home/client-home-old.module").then((m) => m.ClientHomeOldModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 		},
			// 	},
			// },
			// {
			// 	path: 'market-promotion',
			// 	loadChildren: () => import('./pages/client-market-promotion/client-market-promotion.module').then(m => m.ClientMarketPromotionModule)
			// },
			// {
			// 	path: 'market-promo',
			// 	loadChildren: () => import('./pages/client-market-promo/client-market-promo.module').then(m => m.ClientMarketPromoModule)
			// },
			// {
			// 	path: "quiz",
			// 	loadChildren: () => import("./pages/client-quiz/client-quiz.module").then((m) => m.ClientQuizModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Quiz!",
			// 		},
			// 	},
			// },
			// {
			// 	path: "sean.quiz",
			// 	loadChildren: () => import("./pages/client-quiz/client-quiz.module").then((m) => m.ClientQuizModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Quiz!",
			// 		},
			// 	},
			// },
			// {
			// 	path: "email-confirmation",
			// 	loadChildren: () =>
			// 		import("./pages/client-email-confirmation/client-email-confirmation.module").then(
			// 			(m) => m.ClientEmailConfirmationModule
			// 		),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Email Confirmation",
			// 		},
			// 	},
			// },
			// {
			// 	path: "how-it-works",
			// 	canActivate: [DefaultRoleGuard],
			// 	loadChildren: () =>
			// 		import("./pages/client-how-it-works/client-how-it-works.module").then((m) => m.ClientHowItWorksModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - How it works",
			// 		},
			// 	},
			// },
			// {
			// 	path: "promo_rus",
			// 	loadChildren: () =>
			// 		import("./pages/client-how-it-works-2/client-how-it-works-2.module").then((m) => m.ClientHowItWorks2Module),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Promo Rus",
			// 		},
			// 	},
			// },
			// {
			// 	path: "promo_ukr",
			// 	loadChildren: () =>
			// 		import("./pages/client-how-it-works-3/client-how-it-works-3.module").then((m) => m.ClientHowItWorks3Module),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Promo Ukr",
			// 		},
			// 	},
			// },
			// {
			// 	path: "promo_eng",
			// 	loadChildren: () =>
			// 		import("./pages/client-promo-eng/client-promo-eng.module").then((m) => m.ClientPromoEngModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Promo Eng",
			// 		},
			// 	},
			// },
			// {
			// 	path: "promo_tr",
			// 	loadChildren: () => import("./pages/client-promo-tr/client-promo-tr.module").then((m) => m.ClientPromoTrModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Promo Tr",
			// 		},
			// 	},
			// },
			// {
			// 	path: "promo_esp",
			// 	loadChildren: () =>
			// 		import("./pages/client-promo-esp/client-promo-esp.module").then((m) => m.ClientPromoEspModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Promo Tr",
			// 		},
			// 	},
			// },
			// {
			// 	path: "promo_fr",
			// 	loadChildren: () => import("./pages/client-promo-fr/client-promo-fr.module").then((m) => m.ClientPromoFrModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Promo Tr",
			// 		},
			// 	},
			// },
			// {
			// 	path: "promo_vt",
			// 	loadChildren: () => import("./pages/client-promo-vt/client-promo-vt.module").then((m) => m.ClientPromoVtModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Promo Tr",
			// 		},
			// 	},
			// },
			// {
			// 	path: "promo_pt",
			// 	loadChildren: () => import("./pages/client-promo-pt/client-promo-pt.module").then((m) => m.ClientPromoPtModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Promo Tr",
			// 		},
			// 	},
			// },
			// {
			// 	path: "promo_in",
			// 	loadChildren: () => import("./pages/client-promo-in/client-promo-in.module").then((m) => m.ClientPromoInModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Promo Tr",
			// 		},
			// 	},
			// },
			// {
			// 	path: "promo_ar",
			// 	loadChildren: () => import("./pages/client-promo-ar/client-promo-ar.module").then((m) => m.ClientPromoArModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Promo Tr",
			// 		},
			// 	},
			// },
			// {
			// 	path: "privacy-policy",
			// 	loadChildren: () =>
			// 		import("./pages/client-privacy-policy/client-privacy-policy.module").then((m) => m.ClientPrivacyPolicyModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Privacy Policy",
			// 		},
			// 	},
			// },
			// {
			// 	path: "terms-and-conditions",
			// 	loadChildren: () =>
			// 		import("./pages/client-terms-and-conditions/client-terms-and-conditions.module").then(
			// 			(m) => m.ClientTermsAndConditionsModule
			// 		),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Terms And Conditions",
			// 		},
			// 	},
			// },
			// {
			// 	path: "contact-us",
			// 	canActivate: [DefaultRoleGuard],
			// 	loadChildren: () =>
			// 		import("./pages/client-contact-us/client-contact-us.module").then((m) => m.ClientContactUsModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Contact - contact us to know more information",
			// 			description: "B2B Discount - Contact Us",
			// 		},
			// 	},
			// },
			// {
			// 	path: "cookie-policy",
			// 	loadChildren: () =>
			// 		import("./pages/client-cookie-policy/client-cookie-policy.module").then((m) => m.ClientCookiePolicyModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Cookie Policy",
			// 		},
			// 	},
			// },
			// {
			// 	path: "legal-help",
			// 	canActivate: [AuthGuard],
			// 	loadChildren: () =>
			// 		import("./pages/client-legal-help/client-legal-help.module").then((m) => m.ClientLegalHelpModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Legal Help",
			// 		},
			// 	},
			// },
			// {
			// 	path: "chats/:id",
			// 	canActivate: [ChatGuard],
			// 	loadChildren: () => import("./pages/client-chat/client-chat.module").then((m) => m.ClientChatModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Chat",
			// 		},
			// 	},
			// },
			{
				path: "latest-offers",
				canActivate: [],
				loadChildren: () =>
					import("./pages/client-latest-offers/client-latest-offers.module").then((m) => m.ClientLatestOffersModule),
				data: {
					meta: {
						title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
						description: "B2B Discount - Latest Offers",
					},
				},
			},
			// {
			// 	path: "offers/:id",
			// 	canActivate: [DefaultRoleGuard],
			// 	// canActivate: [AuthGuard],
			// 	loadChildren: () => import("./pages/client-offer/client-offer.module").then((m) => m.ClientOfferModule),
			// },
			// {
			// 	path: "annual-payment",
			// 	canActivate: [AuthGuard],
			// 	loadChildren: () =>
			// 		import("./pages/client-annual-payment/client-annual-payment.module").then((m) => m.ClientAnnualPaymentModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Payment Details",
			// 		},
			// 	},
			// },
			// {
			// 	path: "tradebid-billing/:quotes",
			// 	canActivate: [AuthGuard],
			// 	loadChildren: () =>
			// 		import("./pages/client-tradebid-billing/client-tradebid-billing.module").then(
			// 			(m) => m.ClientTradebidBillingModule
			// 		),
			// },
			// // {
			// // 	path: "buy-offer-39",
			// // 	canActivate: [AuthGuard],
			// // 	loadChildren: () =>
			// // 		import("./pages/client-annual-payment/client-annual-payment.module").then((m) => m.ClientAnnualPaymentModule),
			// // 	data: {
			// // 		meta: {
			// // 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// // 			description: "B2B Discount - Payment Details",
			// // 		},
			// // 	},
			// // },
			// // {
			// // 	path: "pricing",
			// // 	loadChildren: () => import("./pages/client-pricing/client-pricing.module").then((m) => m.ClientPricingModule),
			// // 	data: {
			// // 		meta: {
			// // 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// // 			description: "B2B Discount - Pricing",
			// // 		},
			// // 	},
			// // },
			// // {
			// // 	path: "trade-wiki",
			// // 	canActivate: [DefaultRoleGuard],
			// // 	loadChildren: () =>
			// // 		import("./pages/client-trading-wiki/client-trading-wiki.module").then((m) => m.ClientTradingWikiModule),
			// // 	data: {
			// // 		meta: {
			// // 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// // 			description: "B2B Discount - Trade Wiki",
			// // 		},
			// // 	},
			// // },
			// // {
			// // 	path: "trade-wiki/:id",
			// // 	canActivate: [DefaultRoleGuard],
			// // 	loadChildren: () =>
			// // 		import("./pages/client-trading-wiki-article/client-trading-wiki-article.module").then(
			// // 			(m) => m.ClientTradingWikiArticleModule
			// // 		),
			// // 	data: {
			// // 		meta: {
			// // 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// // 			description: "B2B Discount - Trading Wiki",
			// // 		},
			// // 	},
			// // },
			{
				path: "blog",
				canActivate: [DefaultRoleGuard],
				loadChildren: () => import("./pages/client-blog/client-blog.module").then((m) => m.ClientBlogModule),
				data: {
					meta: {
						title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
						description: "B2B Discount - Trading Wiki",
					},
				},
			},
			{
				path: "blog/:id",
				canActivate: [DefaultRoleGuard],
				loadChildren: () =>
					import("./pages/client-blog-article/client-blog-article.module").then((m) => m.ClientBlogWikiArticleModule),
				data: {
					meta: {
						title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
						description: "B2B Discount - Trading Wiki",
					},
				},
			},
			// {
			// 	path: "profile",
			// 	canActivate: [AuthGuard],
			// 	loadChildren: () => import("./pages/client-profile/client-profile.module").then((m) => m.ClientProfileModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Profile",
			// 		},
			// 	},
			// },
			// {
			// 	path: "offer",
			// 	canActivate: [AuthGuard, CompanyInformationGuard, BuyerGuard],
			// 	loadChildren: () =>
			// 		import("./pages/client-profile/pages/client-profile-add-offer/client-profile-add-offer.module").then(
			// 			(m) => m.ClientProfileAddOfferModule
			// 		),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Add Offer",
			// 		},
			// 	},
			// },
			// {
			// 	path: "reset-password/:id",
			// 	canActivate: [DefaultRoleGuard],
			// 	loadChildren: () =>
			// 		import("./pages/client-reset-password/client-reset-password.module").then((m) => m.ClientResetPasswordModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Reset Password",
			// 		},
			// 	},
			// },
			// {
			// 	path: "google-registration-complete",
			// 	loadChildren: () =>
			// 		import("./pages/client-google-complete/client-google-complete.module").then(
			// 			(m) => m.ClientGoogleCompleteModule
			// 		),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Reset Password",
			// 		},
			// 	},
			// },
			// {
			// 	path: "linkedin-registration-complete",
			// 	loadChildren: () =>
			// 		import("./pages/client-google-complete/client-google-complete.module").then(
			// 			(m) => m.ClientGoogleCompleteModule
			// 		),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Reset Password",
			// 		},
			// 	},
			// },
			// {
			// 	path: "registration-complete",
			// 	loadChildren: () =>
			// 		import("./pages/client-registration-complete/client-registration-complete.module").then(
			// 			(m) => m.ClientRegistrationCompleteModule
			// 		),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Reset Password",
			// 		},
			// 	},
			// },
			// {
			// 	path: "account-not-registered",
			// 	loadChildren: () =>
			// 		import("./pages/client-account-not-registered/client-account-not-registered-complete.module").then(
			// 			(m) => m.ClientAccountNotRegistereModule
			// 		),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Reset Password",
			// 		},
			// 	},
			// },
			// {
			// 	path: "email-verify",
			// 	loadChildren: () =>
			// 		import("./pages/client-email-verify/client-email-verify.module").then((m) => m.ClientEmailVerifyModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Reset Password",
			// 		},
			// 	},
			// },
			// {
			// 	path: "annual-succeeded",
			// 	loadChildren: () =>
			// 		import("./pages/client-annual-succeeded/client-annual-succeeded.module").then(
			// 			(m) => m.ClientAnnualSucceededModule
			// 		),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Annual Succeeded",
			// 		},
			// 	},
			// },
			// {
			// 	path: "annual-failed",
			// 	loadChildren: () =>
			// 		import("./pages/client-annual-failed/client-annual-failed.module").then((m) => m.ClientAnnualFailedModule),
			// 	data: {
			// 		meta: {
			// 			title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
			// 			description: "B2B Discount - Payment Failed",
			// 		},
			// 	},
			// },
			{
				path: "tradebid",
				canActivate: [],
				loadChildren: () =>
					import("./pages/client-tradebid/client-tradebid.module").then((m) => m.ClientTradebidModule),
				data: {
					meta: {
						title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
						description: "B2B Discount - TradeBid",
					},
				},
			},
			{
				path: "b2bmarket",
				canActivate: [],
				loadChildren: () =>
					import("./pages/client-marketplace/client-marketplace.module").then((m) => m.ClientMarketplaceModule),
				data: {
					meta: {
						title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
						description: "B2B Discount - Marketplace",
					},
				},
			},
			// {
			// 	path: "about-us",
			// 	canActivate: [],
			// 	loadChildren: () => import("./pages/client-about-us/client-about-us.module").then((m) => m.ClientAboutUsModule),
			// },
			{
				path: "**",
				loadChildren: () =>
					import("./pages/client-not-found/client-not-found.module").then((m) => m.ClientNotFoundModule),
				data: {
					meta: {
						title: "B2B Discount - Buy and Sell B2B Cargo with Discount!",
						description: "B2B Discount - Not Found",
					},
				},
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientRoutingModule {}
