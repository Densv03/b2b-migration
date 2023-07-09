import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { catchError, Observable, of, throwError } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
import { HotToastService } from "@ngneat/hot-toast";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private readonly authService: AuthService,
		private readonly _activatedRoute: ActivatedRoute,
		private hotToastService: HotToastService
	) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const excludedUrls: string[] = [
			"/auth/login",
			"/auth/register-credentials",
			"/auth/forgotPassword",
			"/create-customer-profile",
			"/create-payment-by-profile",
			"/tradebid",
		];
		const token = localStorage.getItem("token");
		const clonedRequest = request.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});
		return next.handle(clonedRequest).pipe(
			catchError((error: any) => {
				if (error.error?.code && error.error.code === 1012) {
					return throwError(error);
				}
				if (error.status === 401 && !request.url.includes('products')) {
					if (error.error.message === "User authorization token is not up to date") {
						this.authService.logOut();

						this.hotToastService.show("You have more than two sessions from the same account. Please login again.", {
							dismissible: true,
							style: {
								border: "1px solid #E63D3D",
							},
							autoClose: true,
						});
					}
				}
				const url = error.url.toLowerCase();
				if (excludedUrls.some((excludedUrl) => url.includes(excludedUrl))) {
					return throwError(error);
				}
				return throwError(error)
			})
		);
	}
}
