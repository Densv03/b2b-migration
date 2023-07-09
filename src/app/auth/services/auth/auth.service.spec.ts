import { TestBed } from "@angular/core/testing";

import { AuthService } from "apps/site/src/app/auth/services/auth/auth.service";

describe("AuthService", () => {
	let service: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AuthService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
