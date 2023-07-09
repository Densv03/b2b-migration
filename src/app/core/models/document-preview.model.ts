export interface DocumentPreviewModel {
	name: string,
	_id: string,
	path: string,
	fullPath: string,
	isDocument: boolean,
	isImage: boolean,
	size: string | number,
	extension: string
}
