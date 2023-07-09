import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function socialLink(): ValidatorFn {
	const latinCharacters = /(?:https?:)?\/\/(?:[A-z]+\.)?(twitter|linkedin|instagram|facebook)\.com/;

	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}

		const noSpaceStr = control.value.replace(/\s/g, "");
		if (!latinCharacters.test(String(noSpaceStr).toLowerCase())) {
			return { socialError: true };
		}

		return null;
	};
}
