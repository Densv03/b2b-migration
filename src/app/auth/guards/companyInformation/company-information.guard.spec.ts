import { TestBed } from "@angular/core/testing";

import { CompanyInformationGuard } from "./company-information.guard";

describe("CompanyInformationGuard", () => {
	let guard: CompanyInformationGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(CompanyInformationGuard);
	});

	it("should be created", () => {
		expect(guard).toBeTruthy();
	});
});
