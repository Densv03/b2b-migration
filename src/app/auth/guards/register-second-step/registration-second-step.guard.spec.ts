import { TestBed } from "@angular/core/testing";

import { RegistrationSecondStepGuard } from "./registration-second-step.guard";

describe("RegistrationSecondStepGuard", () => {
	let guard: RegistrationSecondStepGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(RegistrationSecondStepGuard);
	});

	it("should be created", () => {
		expect(guard).toBeTruthy();
	});
});
