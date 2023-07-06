import { ChangeDetectionStrategy, Component } from "@angular/core";
import { B2bNgxButtonThemeEnum } from "@b2b/ngx-button";
import { B2bNgxLinkThemeEnum } from "@b2b/ngx-link";

const COOKIES_POLICY = [
	{
		title: "Оur Website Uses Cookies",
		description: `By using this Website, You consent to Our use of Cookies in accordance with the terms of this Cookie Policy. This Cookie Policy is set to inform Our Users of all tracking, how User’s data is being handled, and with whom it is shared. It informs Our Users on their rights and how to exercise them, and states the technical specifications and purpose of each tracker.`,
	},
	{
		title: "Definitions",
		description: `The following terms have the meanings as mentioned below:

“B2B Discount” - refers to “B2B Discount Inc.”, and its affiliates, parents, and subsidiaries, EIN: 86-3844749, registered under the address: 6400 NE HIGHWAY 99 STE G PMB 579 VANCOUVER, WA 98665, incorporated under the laws of the State of Washington of the United States of America (hereinafter – “Company”, “B2B”, “Website”, “We” or “Our”).

“User”, “You” — the natural person that once visited and hence used Our Website.

“Website” - a set of pages of information, all content and links related to the website “https://b2b.discount/”.

“Cookies” - small pieces of data, stored in text files, that are stored on the computer of a User or other device when websites are loaded in a browser.

“Third party” - natural or legal persons, companies, service providers or other persons, that could be involved in a process of receiving certain data from Users.

“Personal Data”, “Data” - any information related to an identified or identifiable natural person (a name, an identification number, location, an online identifier, etc).

“European Union, “EU” — unless otherwise specified, all references made within this document to the European Union include all current member states to the European Union and the European Economic Area.`,
	},
	{
		title: `What are Cookies?`,
		description: `Cookies are small pieces of data, stored in text files, that are stored on the computer of the User or other device when websites are loaded in a browser. Their purpose is to “remember” preferences of a User, as for a single visit, as for serial visits. They ensure a consistent and efficient experience for visitors, and perform essential functions such as allowing Users to be always logged in. Cookies may be set by the Website that visits a User (first party Cookies), or by Third parties, which are related to a Website (Third party Cookies). For example, those who serve content or provide advertising or analytics services on the Website

When a User visits Our Website, User\`s device will be asked for permission to store this file on that device and access information from it. Once the User visit the Website, the User will be prompted to accept or refuse Cookies.`,
	},
	{
		title: `Consent to the use of Cookies`,
		description: `Only in case when a User actively accepts the use of Cookies via the notice on Our Website, a User consent to the use of Cookies.

Cookies that are not strictly necessary to secure access to the Website are only used if You give Us Your consent.

If a User is a resident of European Union, that User is a subject to the provisions of the European Commission’s General Data Protection Regulation (hereinafter simply “GDPR”). You can read the provisions of GDPR  at the official website: https://eur-lex.europa.eu/eli/reg/2016/679/oj.

Do You know that You can manage Your Cookie settings any time? More at section “Cookies management”.`,
	},
	{
		title: `Types of Cookies used on Our Website`,
		description: `There are just 4 types of Cookies. Please look, how it’s going on:

A) Strictly necessary Cookies
These Cookies are essential in order to enable you to move around Our Website and use some of our features, such as accessing secure areas of the website. Without these Cookies services you have asked for cannot be provided or may be limited.
\t
B) Performance Cookies (analytical / statistic)
These Cookies collect information about how Our visitors use a Website, for instance which pages visitors click on most often, and if they get error messages from web pages. These Cookies don't collect information that identifies a User. All information these Cookies collect is aggregated and therefore anonymous. It is only used to improve how a website works.

C) Functionality Cookies (preferences / settings)
These Cookies allow our Website to remember choices which make a User (such as user name, language or the location) and provide enhanced, more personal features. These Cookies can also be used to remember changes that a User has made to text size, fonts and other parts of web pages that can be customized. They may also be used to provide services a User has asked for.

D) Targeting Cookies (advertising)
These Cookies are used to deliver more relevant ads to User and User’s interests. They are also used to limit the number of times when a User sees the ads, as well as help measure the effectiveness of the advertising campaigns. They are placed by Third-party advertising networks.`,
		rows: [
			{
				name: "_ga",
				provider: ".b2b.discount",
				purpose:
					"Collects information about the users and their activity on the website for analytics and reporting purposes.",
				type: "Statistical",
				expiryPeriod: "2 years",
				dataIsSentTo: "Google Analytics https://policies.google.com/technologies/partner-sites?hl=en",
			},
			{
				name: "_ga_RYZBQW3SPX",
				provider: ".b2b.discount",
				purpose:
					"Collects information about the users and their activity on the website for analytics and reporting purposes.",
				type: "Statistical",
				expiryPeriod: "2 years",
				dataIsSentTo: "Google Analytics https://policies.google.com/technologies/partner-sites?hl=en",
			},
			{
				name: "_gat_UA-193007750-1",
				provider: ".b2b.discount",
				purpose:
					"Collects information about the users and their activity on the website for analytics and reporting purposes.",
				type: "Statistical",
				expiryPeriod: "a few seconds",
				dataIsSentTo: "Google Analytics https://policies.google.com/technologies/partner-sites?hl=en",
			},
			{
				name: "_gid",
				provider: ".b2b.discount",
				purpose: "Collects information about the users and their activity on the website for analytics and reporting ",
				type: "Statistical",
				expiryPeriod: "a day",
				dataIsSentTo: "Google Analytics https://policies.google.com/technologies/partner-sites?hl=en",
			},
			{
				name: "_hjAbsoluteSessionInProgress",
				provider: ".b2b.discount",
				purpose:
					"Collects information about the users and their activity on the website for analytics and reporting purposes.",
				type: "Statistical",
				expiryPeriod: "30 minutes",
				dataIsSentTo: "Hotjar https://www.hotjar.com/legal/policies/privacy",
			},
			{
				name: "_hjIncludedInPageviewSample",
				provider: ".b2b.discount",
				purpose:
					"Collects information about the users and their activity on the website for analytics and reporting purposes.",
				type: "Statistical",
				expiryPeriod: "30 minutes",
				dataIsSentTo: "Hotjar https://www.hotjar.com/legal/policies/privacy",
			},
			{
				name: "_hjid",
				provider: ".b2b.discount",
				purpose:
					"Collects information about the users and their activity on the website for analytics and reporting purposes.",
				type: "Statistical",
				expiryPeriod: "1 year",
				dataIsSentTo: "Hotjar https://www.hotjar.com/legal/policies/privacy",
			},
			{
				name: "_BEAMER_FIRST_VISIT_zeKLgqli17986",
				provider: ".b2b.discount",
				purpose:
					"Collects information about the users and their activity on the website for analytics and reporting purposes.",
				type: "Statistical",
				expiryPeriod: "300 days",
				dataIsSentTo: "Beamer https://www.getbeamer.com/privacy-policy",
			},
			{
				name: "_BEAMER_USER_ID_zeKLgqli17986",
				provider: ".hotjar.com",
				purpose:
					"Collects information about the users and their activity on the website for analytics and reporting purposes.",
				type: "Statistical",
				expiryPeriod: "300 days",
				dataIsSentTo: "Beamer https://www.getbeamer.com/privacy-policy",
			},
		],
		columns: [
			{ prop: "name", name: "Name" },
			{ prop: "provider", name: "Provider" },
			{ prop: "purpose", name: "Purpose" },
			{ prop: "type", name: "Type" },
			{ prop: "expiryPeriod", name: "Expiry Period" },
			{ prop: "dataIsSentTo", name: "Data is sent to" },
		],
	},
	{
		title: `Third parties Cookies`,
		description: `In case of displaying advertisements and/or redirecting to another website, all Cookies will be collected in accordance with the rules of the Third party processors. That means that We do not have any influence  on Third party’s behaviour.

Our website uses Google Analytics to analyse the User Experience of this website. Google Analytics generates statistical and other information about website use by means of Cookies, which are stored on Users' computers. The information generated relating to our website is used to create reports about the use of the website. Google will store and use this information. Google's privacy policy is available at: http://www.google.com/policies/privacy/.

Our website publishes Google Adsense personalised advertisements on Our Website. These are tailored by Google to reflect User’s interests. To determine User’s interests, Google will track behaviour of a User across the web using Cookies. A User can view, delete or add interest categories associated with a User's browser using Google's Ads Preference Manager, available at: http://www.google.com/ads/preferences/. A User can opt-out of the Adsense partner network cookie at: http://www.google.com/policies/technologies/ads/.`,
	},
	{
		title: "Cookies management",
		description: `Take control of Your Cookies easily! Do You know that You can get a guide on Cookies management on the website aboutcookies.org?

Also, You can delete Cookies that are already set on Your device by clearing the browsing history of Your browser. This can remove certain or even all Cookies from all websites (including Our) You have visited.`,
	},
	{
		title: `Refusing and deleting of Cookies`,
		description: `Most browsers allow their users to refuse to accept Cookies. For example, in Google Chrome browser, a User can refuse all Cookies by clicking: “Settings” - “Cookies and other site data” - “Block all cookies” / “Block third-party cookies” / “Block third-party cookies in Incognito”.

To refuse Cookies in Opera browser, click “Opera Menu” - Go to “Settings” and select “Preferences” 3Click on the “Advanced” tab. On the side Panel click on 'Cookies' and select 'Never accept cookies'

To refuse Cookies in Safari browser, follow: “Safari” - “Preferences”, - click “Privacy”, then do any of the following: Prevent trackers from using cookies and website data to track you: Select “Prevent cross-site tracking.”; Always block cookies: Select “Block all cookies.”; Always allow cookies: Deselect “Block all cookies.”

To clear Cookies in Google Chrome, please click: “Settings” - “Clear browsing data” - Сhoose proper period of time - Click the tick in front of the phrase “Cookies and other site data” - and finally click “Clear data”.

To clear Cookies in the Opera browser, go to “Settings” - “Advanced” - “Privacy and Security” and click “Site settings”. Click “Cookies and site data”, and select “See all cookies and site data”. Use the search bar to find a specific cookie, and click the trash icon to delete individual cookies.

To clear Cookies in Safari browser go to “Settings” - “Safari” - “Advanced” - “Website Data”, then tap Remove All Website Data.`,
	},
	{
		title: `Access to the Cookies information`,
		description: `“B2B Discount” as a Cookies provider has access to the information collected by Cookies. As We use services of Third parties, they have access to Cookies information. There are: hotjar.com, google.com, digitalocean.com

How Cookies are stored?

All relevant information on the period of Cookies storing a User can check in the table in the section “4. Types of Cookies used on Our Website”.

Contact us,

If there any problems or questions about this Cookie Policy occurred, please, drop us a line via email: info@b2b.discount or legal address: 6168 NE Hwy 99 Ste 201 Vancouver WA 98665, USA. We  will try to respond as soon as possible, but no longer than in 60 calendar days.`,
	},
	{
		title: "How Cookies are stored?",
		description: `All relevant information on the period of Cookies storing a User can check in the table in the section “4. Types of Cookies used on Our Website”.`,
	},
	{
		title: "Contact us",
		description: `If there any problems or questions about this Cookie Policy occurred, please, drop us a line via email: info@b2b.discount or legal address: 6168 NE Hwy 99 Ste 201 Vancouver WA 98665, USA. We  will try to respond as soon as possible, but no longer than in 60 calendar days.`,
	},
];

@Component({
	selector: "b2b-client-cookie-policy",
	templateUrl: "./client-cookie-policy.component.html",
	styleUrls: ["./client-cookie-policy.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCookiePolicyComponent {
	public readonly options = COOKIES_POLICY;
}
