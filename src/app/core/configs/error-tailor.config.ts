import { TranslocoService } from "@ngneat/transloco";

export const ERROR_TAILOR_CONFIG = {
	errors: {
		useFactory(service: TranslocoService) {
			return {
				required: () => service.translate("ERRORS.REQUIRED"),
				email: service.translate("ERRORS.EMAIL"),
				fullName: service.translate("ERRORS.FULL_NAME"),
				latin: "",
				oneContainer: service.translate("ERRORS.ONE_CONTAINER"),
				min: service.translate("ERRORS.MIN"),
				max: service.translate("ERRORS.MAX"),
				minlength: ({ requiredLength }) => service.translate("ERRORS.MIN_LENGTH") + requiredLength,
				maxlength: ({ requiredLength }) => service.translate("ERRORS.MAX_LENGTH") + requiredLength,
				1000: service.translate("ERRORS.1000"),
				1001: service.translate("ERRORS.1001"),
				1002: service.translate("ERRORS.1002"),
				1012: service.translate("ERRORS.1012"),
				1014: service.translate("ERRORS.1014"),
				mask: service.translate("ERRORS.MASK"),
				validatePhoneNumber: service.translate("ERRORS.VALIDATE_PHONE_NUMBER"),
			};
		},
		deps: [TranslocoService],
	},
	blurPredicate: (element: Element) => {
		return ["B2B-NGX-TEL"].some((selector) => element.tagName === selector);
	},
};
