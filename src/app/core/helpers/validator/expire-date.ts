import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function expireDate(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const expDate: string = control.value;
		const month = parseInt(expDate.slice(0, 2));
		const year = parseInt(expDate.slice(2, 4));
		const currentYear = parseInt(new Date(Date.now()).getFullYear().toString().slice(2));

		if (month < 1 || month > 12 || year < currentYear) {
			return { expireDate: true };
		}

		return null;
	};
}
