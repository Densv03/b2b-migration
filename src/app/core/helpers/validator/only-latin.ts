import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function onlyLatin(): ValidatorFn {
	const latinCharacters = /^[a-zA-Z]+$/;

	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}

		const noSpaceStr = control.value.replace(/\s/g, "");
		if (!latinCharacters.test(String(noSpaceStr).toLowerCase())) {
			return { latin: true };
		}

		return null;
	};
}
