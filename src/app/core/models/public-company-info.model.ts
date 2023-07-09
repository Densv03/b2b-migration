import { Phone } from "./user/phone.model";
import { Photo } from "./photo.model";
import { DocumentModel } from "./document.model";

export interface PublicCompanyInfoModel {
	address: string,
	annualRevenue: string,
	businessType: string,
	categories: string[],
	companyDescription: string,
	companyName: string,
	country: string,
	createdAt: string,
	documents: DocumentModel[],
	logo: Photo
	email: string,
	employeesNumber: string,
	phone: Phone,
	position: string,
	user: string,
	website: string,
	socialMedia: SocialMedia
	yearOfFoundation: string,
	_id: string
}

export interface SocialMedia {
	instagram: string,
	facebook: string,
	linkedin: string,
	twitter: string,
}
