import { ChangeDetectionStrategy, Component } from "@angular/core";

const TERMS_AND_CONDITIONS = [
	{
		title: `A few general words`,
		description: `
These Terms and Conditions contained herein (the “Terms and Conditions”, “T&C”, “Agreement”, “Terms”) govern the possibilities of use by You, as a Trader, Logistician, or Carrier of this Platform. B2B Discount is a Platform that helps Users to profitably trade cargo (in containers or bulk) and also facilitates business communication between Users.

Please, read these Terms and Conditions carefully before You start using the Platform, as it will apply to Your use. These conditions will be permanently accessible on the Platform. If You do not agree to all of the terms of these Terms and Conditions or Privacy Policy, or You do not have such authority or do not meet the eligibility requirements, You should cease any and all access or use of the Platform. By using Our Platform, You confirm that You accept these Terms and Conditions and agree to comply with them. 

In case You have any questions relating to the terms contained in this Agreement, You may contact Us via email: support@b2b.discount. Your question will be responded to within 30 (thirty) days, but we will try to respond as soon as it is practically possible. `,
	},
	{
		title: `Definitions`,
		description: `In these Terms and Conditions, the definitions below have the following meanings whenever capitalized, whether used in singular or plural form.

“Platform” — the website https://b2b.discount/ and all its content and links, which can be used by You (hereinafter “Platform”).

“B2B Discount” - refers to “B2B Discount Inc.”, and its affiliates, parents, and subsidiaries, EIN: 86-3844749, registered under the address: 6400 NE HIGHWAY 99 STE G PMB 579 VANCOUVER, WA 98665, incorporated under the laws of State of Washington of the United States of America (hereinafter – “Company”, “B2B Discount”, “Us”, “We” or “Our”).

“Service” — the services, Company provides through the Platform as well as service which helps and facilitates business communication and deals between Users, and helps to avoid the loss of cargo by one User, and facilitates the purchase of such cargo on favorable terms by another User. The Company provides Services through the Platform but is not responsible for the success or failure of deals between Users.

“User” - a person who has passed the Registration procedure. The User, in accordance with these Terms and Conditions, will be considered as a Logistician, Carrier, Trader, including Buyers and Sellers.

“Registration” - providing the Company the necessary data by filling out the registration form.`,
	},
	{
		title: `About B2B Discount Platform`,
		description: `Our Platform is practically unparalleled and is a unique solution to cases that may arise during the transportation of cargo in containers or bulk. B2B Discount presents a Platform that provides up-to-date information about refused containerized or bulk cargo. The Company helps and facilitates communication between Users, which avoids the loss of cargo by one User and facilitates the acquisition of such cargo on favorable terms by another User. The User can receive contact information for communication with another User on the subject of the transaction or communicate with another User directly through the Platform, discussing all the necessary details of the transaction in correspondence. How it works, You can watch the video on the Platform (in English and Russian languages).`,
	},
	{
		title: `Subject`,
		description: `The Company undertakes to provide the Users with Services through the Platform under the terms of this Agreement.

The acceptance of these Terms and Conditions is made by Users’ unconditional access to this Agreement through the acceptance of the Terms of this Agreement after passing the Registration procedure in accordance with section 5.1. of this Agreement and after сlicking the necessary bottom in the check-box “Agree with Terms and Conditions and Privacy Policy”.

3.1. Marketing Policy

In addition, after сlicking the necessary bottom in the check-box ”Agree with Marketing Policy” and unless You unsubscribe from the specified emailing list or cancel Your account, You consent to receive automatic system emails, marketing campaigns, and other notifications from Us if You have an account on this Platform. You also agree that We may contact You for technical support or other questions relating to Your use of the Platform or Our commercial activity.
`,
	},
	{
		title: `Using B2B Discount`,
		description: `The Users can use the Platform and Services after Registration and providing of certain basic information about themselves that User authorizes the Company to use and disclose, as described in Our Privacy Policy.

You agree to be bound by all terms of this Agreement and any future amendments and additions to it that We may publish from time to time. Please read this Agreement carefully. If You do not agree to accept and obey the terms of this Agreement, you must immediately stop using the Platform.

`,
	},
	{
		title: `Registration & Scope`,
	},
	{
		title: `Registration`,
		description: `To use Our Services through the Platform, the User must complete the Registration procedure. The User needs to select the type of account (Trader, Logistician, or Carrier). After that, User needs to fill out the registration form indicating the type of cargo, email, phone number, and password. 

Each User, regardless of the type of account choosen, can be a Seller and a Buyer. You can familiarize Yourself with the cost of the Services in section 9.
`,
	},
	{
		title: `Scope of the Services`,
		description: `The User as a Seller can:
place unlimited bids for cargo sales (specifying information about the name of the company, contact person, phone number and email, cargo information, transportation, and route information and upload the required documents / photos. The Seller can choose what information will be automatically available to other Users);
receive legal consultation on cargo sale and technical support 24/7 according to the terms of this Agreement. 

The User as a Buyer can:
place unlimited bids for cargo sales (specifying information about the name of the company, contact person, phone number and email, cargo information, transportation, and route information and upload the required documents. The Seller can choose what information will be automatically available to other Users);
receive legal consultation on cargo sale and technical support 24/7; 
review cargo sale offers with a discount; 
get access to all information disclosed by the Seller, including Seller’s phone number / email, and any extra photos / documents (if the display of such information was allowed by the Seller);
buy preferred cargo at discount;
subscribe to the newsletter to receive updates on preferred goods;
receive legal consultation on purchase 24/7 in accordance with this Agreement.
Additionally, information regarding the Seller is available to the Buyers as well as his status and other information: whether the account was verified, high demand offer, price drop, route, ETA, old and new price per ton and amount of cargo, as well as documents that have been uploaded by the Seller.

The User is not allowed to provide contact information (company name, phone number, email address and other data) that can identify the User when placing an Offer in the Description block. Description block can contain only additional information about the cargo (for example, the vessel by which the cargo is transported, the method of packing the cargo, IMO, etc.)

Users can enter into direct correspondence with each other through the Platform or by redirecting to personal messengers. 

The Company is not responsible for the content and relevance of the information that Users provide to each other and will not be a party in the event of any legal or other proceedings and disputes.

The Company checks the uploaded documents for compliance with the bill of lading but is not responsible for their authenticity, non-forgery, alteration, etc.
`,
	},
	{
		title: `Trade Wiki`,
		description: `The Trade Wiki is a section on the Platform where Users can share their experience with other Users, and other Users can post comments.

The Company provides an opportunity for Users to share their own work experience by submitting their posts/articles on relevant topics. The topic may contain information about the experience of the User in a certain country, about the necessary documents, necessary pictures, certificates, etc. The Company can also send messages to Users with an invitation to share their experience by writing a post. The Company provides additional services for such Users on the Platform by posting posts. Each User can subscribe to receive notifications about new posts.

In addition, the Company reserves the right to involve a content manager in articles preparation.
`,
	},
	{
		title: `Moderation and restrictions Trade Wiki`,
		description: `The Company encourages You to express Your opinion or experience, but please do not post offensive content. Offensive content includes but is not limited to racial or ethnic slurs, personal insults, the content of a sexually-explicit nature, etc. You may not disclose any type of confidential information about other Users or about companies that are not registered on the Platform or provide false, defamatory data or information, and You must not use content or images that are not used from open sources or do not belong to You. Please be yourself, but do so in a respectful manner, as the Company reserves the right and discretion to edit, pull or refrain from posting posts or comments at its discretion. The Platform is not an advertisement platform for specific services, including any type of legal service or other services, and its content shall not be construed as legal advice. You are prohibited from using any Company’s content and articles to advertise, perform or promote any commercial solicitation of goods and/or services other than those offered by the Company.

The Company will moderate each topic within 8 (eight) hours after which the topic will be published on the Platform if it does not violate the requirements of the Platform. The Company does not verify the accuracy of facts or statements about the honor, dignity, and reputation of individuals or companies. The Company is not responsible for the authenticity of the facts that are indicated in the topic, as well as for any statements regarding the honor, dignity, commercial reputation of individuals or companies that are mentioned in the topics. Each User confirms that he understands the specifics of activities in this area and will not have any claims against the Company for posting any information on the Platform in topics and comments, even if such information is untrue, defamatory, or intentionally written by competitors.

The User can contact the Company with a request to delete the relevant article or comment. The Company has the right to delete or refuse to delete a post or comment after checking it at its own discretion. The Company will not provide explanations to the User about the reasons for its actions.
`,
	},
	{
		title: `Additional Services`,
		description: `Through the Platform, the Company provides Users with the opportunity to receive additional legal support services. In order to receive legal assistance, the User may press the “Contact Us” tab and select the legal assistance section.

Please note that the User can only get initial consultation free of charge, which does not include any paperwork or transaction support. The initial consultation includes general information.

In the event that the User needs to obtain legal support (provide accurate information about the necessary documents, draw up documents or carry out transaction support), the User can contact one of the partners of the Company who are listed on the Platform. The costs of legal services are not included in the costs of the Company's Services and to be negotiated with lawyers separately. The Platform or the Company is not a party in the relationship between lawyers and Users and is not responsible for any legal consultation.

The Company is not responsible for the actions of lawyers, namely for the relevance of consultations and data, for the correctness of executed documents, etc. All claims regarding legal support to be directed by the User to the appropriate lawyer or legal company.
`,
	},
	{
		title: `Restrictions`,
		description: `
When using Services or accessing the Platform, You are not allowed to:
use Our Services or Platform if You are not able to form legally binding contracts (for example, if you are under 18 years old);
interfere with the infrastructure of Our Website, or impose an unreasonable or disproportionately large load on Our infrastructure;
infringe the copyright, trademark, patent, publicity, moral, database, and/or other intellectual property rights (collectively called “Intellectual Property Rights”) that belong to or are licensed to B2B Discount; \t
commercialize the Platform;
disguise the origin of information transmitted through the Platform;
place false or misleading information on the Platform, including transport documents;
use or access any Service, information, application, or software available via the Platform in a manner not expressly permitted by Company;
input or upload to the Platform any information that may contain viruses, Trojan horses, worms, time bombs, or other computer programming routines that are intended to damage, interfere with, intercept or expropriate any system, Platform, Services, or information.
`,
	},
	{
		title: `Payments`,
		description: `B2B Discount provides both: paid and free of charge Services. 

If the User wants to place advertisements for the sale of the container or bulk cargo, such placements are free and unlimited. 

If the User wants to have full access to information on advertisements for the sale of cargo (including data from the bill of lading and contact information of Users (Sellers), as well as to purchase cargo, such opportunities are available under the cost of $600 per year. 

The User can pay for the Services, choosing one of the following options:
- by credit card (entering all the necessary data);
- using the PayTabs payment system;
- another payment method, which may include payment using a crypto wallet.

The commission of banks, payment systems, or other payment instruments may be collected and paid by the User independently. After the funds are credited to the Company, the User will be able to use the paid Services of the Platform.

At the end of the paid year, the Company will automatically debit funds from the User's bank card in the amount of the tariff that will be set by the Company on the date the funds are debited. The Company will notify Users of the following transaction at least 14 (fourteen) days prior to the transaction date.

If the Company has restricted the User's access to the Services or the Platform or blocked the User's account or the User has independently notified the Company of its unwillingness to use the Services before the expiration date of the paid year, the Company will in no case return the full payment or any part of it to the User.

The Company may restrict the User's access to the Services or the Platform or block the User's account in the following cases:
sending spam, malicious files, viruses, etc. through the Platform;
violation of these Terms and Conditions;
expiration of the paid Services (if the User has not renewed the payment);
an appropriate request from state, federal or regional authorities;
complaints of other Users for non-fulfillment by the User of agreements and/or obligations.

The Company is not responsible for the process of trade, bids, and transactions, for violation of the terms of payment, for quality and/or quantity, for non-payment between Users for sold/purchased containers and bulk cargo.
`,
	},
	{
		title: `Rights and Obligations`,
	},
	{
		title: `The User's rights and obligations`,
		description: `The User has the right to receive in full the Services specified in clause 5.2. of this Agreement.

The User is obliged to fully comply with the terms of this Agreement and look through the Terms and Conditions from time to time. 
`,
	},
	{
		title: `The Company rights and obligations`,
		description: `The Company is obliged not to use the Users’ confidential and personal information for illegal purposes and not to disclose to third parties, except in cases stated by Privacy Policy. The Company is not responsible for the storage of confidential and personal information otherwise specified in Privacy Policy.

The Company has the right at any time to unilaterally change these T&C completely or partially. The Company is not obliged to inform Users about the changes that were made. The updated T&C are posted on the Platform, indicating the date of such an update. 


Our Platform is an object of intellectual property which belongs to the Company, and is also subject to protection in accordance with the legislation of USA, international treaties, and Conventions ratified by USA, Bern Convention on Protection of Works of Literature and Art (Paris Act as of 24.07.1971, as amended and restated on 02.10.1979), Universal Copyright Convention, 1952 as well as other international regulations. Elements of the Platform are also protected by trade dress, trade secret, unfair competition laws, and other laws and may not be copied or imitated in whole or in part. Except as otherwise expressly authorized by these Terms and Conditions, You may not copy, reproduce, modify, amend, lease, loan, sell and/or create derivative works from, upload, transmit, and/or distribute the intellectual property of the Platform in any way without B2B Discount's prior written permission. Any copying of information, text, images, other data, trademarks and logos, elements of the Platform will be perceived as a violation of the copyright of the Company and may serve as a reason for legal proceedings, bringing the violator to justice, in accordance with the laws of State of Vancouver of the United States of America.

The name B2B Discount and other B2B Discount marks, commercial names, logos, designs, and phrases that We use in connection with Our Platform, ways and methods of their use, may not be used without the express written prior permission of the Company.

The Users undertake not to infringe in any way the intellectual property rights held by B2B Discount. 
`,
	},
	{
		title: `Limitation of Liability. Disclaimer of Warranties`,
		description: `The Platform is provided “as is” and “as available”. The Company makes no representation, warranty, or guarantee regarding the reliability, timeliness, quality, suitability, or availability of the Platform or that the Platform will be uninterrupted or error-free. The Company does not guarantee the quality, suitability, safety, or ability of third-party providers.

You expressly agree that the entire risk arising out of your use of the Platform remains solely with You, to the maximum extent permitted under applicable law. You agree that from time to time, B2B Discount may remove or change the content at any time, or otherwise limit or disable Your access to the Platform without notice to You.

The Company is not responsible for the accuracy of the data contained in topics, comments, as well as in documents uploaded by Users to the Platform.

The Company is not responsible for the safety of the cargo in any port or during its transportation, for the conformity of the documented cargo to the actually delivered cargo, as well as for any changes in its suitability and quantity.

The Company is not responsible for any expenses of Users who carry out a transaction (purchase or sale of cargo) through the Platform. All costs for re-routing, storage, etc. are covered by the Buyer and the Seller in accordance with their agreements. 

The Company shall not be liable for damages in the event when the liability is related to negligence or other misconduct of the User. 

The Company is not responsible for erroneous decisions made by Users about opportunities, income, profits, Services provided by the Company or other materials posted on the Platform: text, audio and video information. Please, take this fact seriously: all statements and examples on the Platform are just assumptions, someone's opinion or experience about future or current earnings, income, opportunities, therefore, it is not a guarantee of their receipt. If in the articles the User indicates a specific result or the amount of earnings from particular deals with the company or the bids, then this does not guarantee the Users the same income when organizing a similar business. The User accepts as a fact, he may not receive such funds or results.
`,
	},
	{
		title: `Privacy Policy`,
		description: `We process personal data according to Our Privacy Policy. In case of any conflict of terms regarding personal data processing, the Privacy Policy shall take precedence over the terms regarding data privacy settled in these Terms and Сonditions.`,
	},
	{
		title: `Force Majeure`,
		description: `We will not be liable for delays, failure in performance, or interruption of the Platform which results directly or indirectly from any cause or condition beyond our reasonable control, including any delay or failure due to any acts of God, an act of civil or military authorities, acts of terrorists, civil disturbance, war, strike or other labor dispute, fire, interruption in telecommunications or Internet services or network provider services, failure of equipment and/or software, other catastrophes or any other occurrences which are beyond Our reasonable control and will not affect the validity and enforceability of any remaining provisions.`,
	},
	{
		title: `Children`,
		description: `You must be at least 18 years old or over, or the legal age to form a binding contract in your jurisdiction if that age is greater than 18 years, to use the Services and Platform. If You are between the ages of 14 and 18 or the applicable legal age in your jurisdiction, You can use the Services and Platform only under the supervision of Your parent or guardian who has agreed to these Terms and Conditions. Those who are under the age of 14 may not use the Services and Our Platform. Parents or legal guardians of a child under the age of 18 may use the Services and Platform on behalf of such a minor child. To use the Services and Platform on behalf of a minor child, You represent and warrant that You are the parent or legal guardian of such child, and that all references in these Terms and Conditions to “You” shall refer to such child or such other individual on whose behalf you have the authorization to enter into these Terms of Conditions and You are in Your capacity as the parent or legal guardian of such child or as the authorized party of such individual.`,
	},
	{
		title: `Changes to these Terms and Conditions`,
		description: `The Company may amend or modify these Terms and Conditions by posting an updated version on the Platform. The revised Agreement will be effective at the time of publication.

If You do not agree with any such modification, You may not use the Platform anymore, and Your sole and exclusive remedy is to terminate Your use of the Platform. If You continue to use the Platform after We’ve made available to You the updated Agreement, You are deemed to have agreed to be bound by the updated Agreement.
`,
	},
	{
		title: `Applicable Law`,
		description: `These Terms and Conditions shall be governed by the laws of the State of Washington of the United States of America.

All disputes which could arise while using Our Platform or Services shall be resolved by the negotiations between the User and Company via official email. 

The official email of the User is the email that was indicated during Registration.

If a dispute is not resolved through negotiations, all disputes arising out of or in connection with these Terms and Conditions shall be settled in accordance with the laws of the State of Washington of the United States of America.
All disputes arising out of or in connection with these Terms and Conditions shall be finally settled by arbitration according to the American Arbitration Association by one or more arbitrator(s) appointed in accordance with the Arbitration Rules. The dispute shall be resolved based on the laws of the State of Washington of the United States of America. The language of the Arbitration Court shall be English.
`,
	},
	{
		title: `Severability`,
		description: `You may not assign these Terms and Conditions or any of Your interests, rights, or obligations under these Terms and Conditions. 

The Agreement will be enforced to the fullest extent permitted under applicable law. If any provision of the Agreement is held by a court of competent jurisdiction to be contrary to law, the provision will be modified by the court and interpreted best to accomplish the objectives of the original provision to the fullest extent permitted by law, and the remaining provisions of the Agreement will remain in effect.
`,
	},
	{
		title: `Contact Us`,
		description: `If there are questions regarding these Terms and Conditions, please contact Our team directly via email: info@b2b.discount. Your question will be responded to within 30 (thirty) days, but we will try to respond as soon as it is practically possible. 

In case of any FAQs on technical support, please contact Us via instant messaging: Viber, Telegram, WhatsApp (available through the Platform).`,
	},
];

@Component({
	selector: "b2b-client-terms-and-conditions",
	templateUrl: "./client-terms-and-conditions.component.html",
	styleUrls: ["./client-terms-and-conditions.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTermsAndConditionsComponent {
	public readonly options = TERMS_AND_CONDITIONS;
}
