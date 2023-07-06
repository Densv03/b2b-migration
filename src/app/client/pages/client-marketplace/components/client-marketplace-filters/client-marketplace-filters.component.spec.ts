import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientMarketplaceFiltersComponent } from "./client-marketplace-filters.component";

describe("ClientMarketplaceFiltersComponent", () => {
	let component: ClientMarketplaceFiltersComponent;
	let fixture: ComponentFixture<ClientMarketplaceFiltersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientMarketplaceFiltersComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientMarketplaceFiltersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
