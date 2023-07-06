import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function onlyNumberandSymbols(): ValidatorFn {
	const latinCharacters = /^[0-9!,/.]+$/;

	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}

		const str = control.value.replace(/\s+/g, "");
		if (!latinCharacters.test(String(str.trim()).toLowerCase())) {
			return { latin: true };
		}

		return null;
	};
}
