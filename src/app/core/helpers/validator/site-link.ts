
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";


export const websiteProtocolRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/
export const websiteRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}(\/.*)?$/;
export function siteLink(): ValidatorFn {

	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}

		if (!websiteRegex.test(control.value.trim())) {
			return { siteError: true };
		}
		return null;
	}
}
