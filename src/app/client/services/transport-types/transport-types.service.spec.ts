import { TestBed } from "@angular/core/testing";

import { TransportTypesService } from "apps/site/src/app/client/services/transport-types/transport-types.service";

describe("TransportTypesService", () => {
	let service: TransportTypesService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(TransportTypesService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
