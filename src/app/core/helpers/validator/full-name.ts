import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function fullName(): ValidatorFn {
	const fullName = /.{1,} .{1,}/;

	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}

		if (!fullName.test(String(control.value).toLowerCase())) {
			return { fullName: true };
		}

		return null;
	};
}
