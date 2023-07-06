export interface Category {
	name: string;
	root: boolean;
	children: Category[];
	hide: boolean;
	createdAt?: Date;
	updatedAt?: Date;
	active: boolean;
	_id: string
}
