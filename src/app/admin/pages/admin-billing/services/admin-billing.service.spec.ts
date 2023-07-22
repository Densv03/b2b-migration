import { TestBed } from "@angular/core/testing";

import { AdminBillingService } from "./admin-billing.service";

describe("AdminBillingService", () => {
	let service: AdminBillingService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AdminBillingService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
