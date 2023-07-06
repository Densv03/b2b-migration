import { TestBed } from "@angular/core/testing";

import { ClientMarketplaceService } from "./client-marketplace.service";

describe("ClientMarketplaceService", () => {
	let service: ClientMarketplaceService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ClientMarketplaceService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
