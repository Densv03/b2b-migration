export function GetUrlExtension(url: string): string {
	if (!url) {
		return '';
	}

	return url.split(/[#?]/)[0].split(".").pop().trim();
}
