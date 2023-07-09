import { TestBed } from "@angular/core/testing";

import { OffersService } from "apps/site/src/app/client/services/offers/offers.service";

describe("OffersService", () => {
	let service: OffersService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(OffersService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
