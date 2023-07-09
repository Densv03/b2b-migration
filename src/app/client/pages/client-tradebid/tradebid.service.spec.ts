import { TestBed } from "@angular/core/testing";

import { TradebidService } from "./tradebid.service";

describe("TradebidService", () => {
	let service: TradebidService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(TradebidService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
