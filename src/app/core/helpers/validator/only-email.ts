import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function onlyEmail(): ValidatorFn {
	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}

		if (!emailRegex.test(String(control.value).toLowerCase())) {
			return { email: true };
		}

		return null;
	};
}
