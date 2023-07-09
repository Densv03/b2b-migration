import { TestBed } from "@angular/core/testing";

import { WikiService } from "apps/site/src/app/client/services/wiki/wiki.service";

describe("OffersService", () => {
	let service: WikiService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(WikiService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
