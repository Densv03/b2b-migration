import { capitalizeFirstLetter } from "./capitalize-first-letter";

export function getFormData(data: any): FormData {
	const formData = new FormData();

	Object.entries(data)
		.filter(([, value]) => !!value)
		.forEach(([key, value]: [string, any]) => {
			if (key === "documents") {
				value.forEach((file: any) => {
					formData.append(key, file);
				});
			} else if (key === "uploadedDocs") {
				formData.append(key, JSON.stringify(value))
			} else if (Array.isArray(value)) {
				value
					.filter((arrayItem) => !!arrayItem)
					.forEach((arrayItem) => {
						formData.append(key, arrayItem);
					});
			} else if (typeof value === "object" && value) {
				for (const childKey in value) {
					const fullKey = `${key}${capitalizeFirstLetter(childKey)}`;
					formData.append(fullKey, value[childKey]);
				}
			} else {
				formData.append(key, value);
			}
		});

	return formData;
}
