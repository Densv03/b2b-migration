export interface Category {
	isSelected?: boolean;
	children: CategoryChildren[];
	_id: string;
	image?: string;
	name: string;
	productsCount: number;
}

interface CategoryChildren {
	name: string;
	sort: number;
	_id: string;
	children: CategoryChildren[];
	productsCount: number;
}
