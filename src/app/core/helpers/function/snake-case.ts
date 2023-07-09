export function snakeCase(str: string): string {
	return str.toUpperCase().replace(/ /g, "_");
}
