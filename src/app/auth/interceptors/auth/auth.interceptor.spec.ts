import { TestBed } from "@angular/core/testing";

import { AuthInterceptor } from "apps/site/src/app/auth/interceptors/auth/auth.interceptor";

describe("AuthInterceptor", () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [AuthInterceptor],
		})
	);

	it("should be created", () => {
		const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
		expect(interceptor).toBeTruthy();
	});
});
