import { TestBed } from "@angular/core/testing";

import { SelectedRoleGuard } from "./selectedRole.guard";

describe("SelectedRoleGuard", () => {
	let guard: SelectedRoleGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(SelectedRoleGuard);
	});

	it("should be created", () => {
		expect(guard).toBeTruthy();
	});
});
