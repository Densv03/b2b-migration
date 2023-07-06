import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function onlyLatinAndSymbols(): ValidatorFn {
	const latinCharacters = /^[A-Za-z!@#$%^&*+()_,./?=|№:/-]+$/;

	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}

		const str = control.value.replace(/\s+/g, "");
		if (!latinCharacters.test(String(str.trim()).toLowerCase())) {
			return { cyrillic: true };
		}

		return null;
	};
}
