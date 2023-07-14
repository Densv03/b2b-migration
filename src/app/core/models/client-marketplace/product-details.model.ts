import { MarketProductModel } from "./market-product.model";
import {PublicCompanyInfoModel} from "../public-company-info.model";

export interface ProductDetailsModel {
	product: MarketProductModel,
	otherProducts: MarketProductModel[],
	company: PublicCompanyInfoModel
}
