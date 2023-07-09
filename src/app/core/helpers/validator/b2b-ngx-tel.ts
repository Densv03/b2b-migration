import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function b2bNgxTel(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) {
			return null;
		}

		// if ((typeof control.value === 'string' && !/^\d+$/.test(control.value)) || (typeof control.value === 'object' && !/^\d+$/.test(control.value?.number))) {
		// 	return {phone: true}
		// }

		if (typeof control.value === "string") {
			const noSpaceStr = control.value.replace(/\s/g, "");
			if (!/^\d+$/.test(noSpaceStr)) {
				return { phone: true };
			}
		} else if (typeof control.value === "object") {
			const noSpaceStr = control.value.number.replace(/\s/g, "");
			if (!/^\d+$/.test(noSpaceStr)) {
				return { phone: true };
			}
		}

		return null;
	};
}
