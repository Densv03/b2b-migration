export interface B2bAuthRootRoleInterface {
	description: string;
	displayName: string;
	explanation: string;
	name: string;
	subRoles: B2bAuthSubRoleInterface[];
	title: string;
	_id: string;
}

interface B2bAuthSubRoleInterface {
	displayName: string;
	name: string;
	id: string;
}
