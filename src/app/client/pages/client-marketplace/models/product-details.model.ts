import { MarketProductModel } from "./market-product.model";
import { PublicCompanyInfoModel } from "../../../../core/models/public-company-info.model";

export interface ProductDetailsModel {
	product: MarketProductModel,
	otherProducts: MarketProductModel[],
	company: PublicCompanyInfoModel
}
