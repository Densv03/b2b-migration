import {Injectable} from "@angular/core";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {delay, Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {AbstractControl, ValidatorFn} from "@angular/forms";

@Injectable({
	providedIn: 'root'
})

export class UniqEmail {
	constructor(private readonly authService: AuthService) {
	}

	uniqLogin(): ValidatorFn {
		return (
			control: AbstractControl
		): Observable<{ emailExist: boolean } | null> => {
			delay(500)
			return this.authService.checkEmailForExisting(control.value).pipe(
				map(() => null),
				catchError(err => {
					return of({emailExist: true});
				})
			);
		};
	}
}
