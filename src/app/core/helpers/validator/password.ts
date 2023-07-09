import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function password(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}

		const strHasNumber = /\d/.test(control.value);
		const strHasUpperCase = /.*?[A-Z]/.test(control.value);
		const strHasLowerCase = /.*?[a-z]/.test(control.value);
		const strWithoutCyrillic = /^[a-zA-Z\d~!@#$%^&*()\-+=|?,{}`"';:><./]+$/.test(control.value);

		if (
			!strHasNumber ||
			!strHasUpperCase ||
			!strHasLowerCase ||
			!strWithoutCyrillic ||
			control.value.length < 8
		) {
			const passwordDoesNotMeetMinimal =
				strHasNumber ||
				strHasLowerCase ||
				strHasUpperCase;
			return {
				oneDigit: !strHasNumber,
				min: !(control.value.length > 8),
				oneUpperCase: !strHasUpperCase,
				oneLowerCase: !strHasLowerCase,
				cyrillic: !strWithoutCyrillic,
				doesNotMeetMinimal: passwordDoesNotMeetMinimal,
			};
		}

		return null;
	};
}
