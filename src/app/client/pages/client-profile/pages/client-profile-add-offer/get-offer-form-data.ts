import {capitalizeFirstLetter} from "../../../../../core/helpers/function/capitalize-first-letter";

export function getOfferFormData(offerToCreate) {
	const formData = new FormData();

	Object.entries(offerToCreate)
		.filter(([, value]) => !!value)
		.forEach(([key, value]: [string, any]) => {
			if (key === "photos" || key === "documents") {
				Array.from(value).forEach((file: any) => {
					formData.append(key, file);
				});
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
