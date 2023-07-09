import { Category } from "./category.model";

export interface CategoriesPaginationModel {
	categories: Category[];
	totalCount: number;
}
