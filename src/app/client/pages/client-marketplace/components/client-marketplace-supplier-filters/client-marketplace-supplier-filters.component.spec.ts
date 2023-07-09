import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientMarketplaceSupplierFiltersComponent } from "./client-marketplace-supplier-filters.component";

describe("ClientMarketplaceSupplierFiltersComponent", () => {
	let component: ClientMarketplaceSupplierFiltersComponent;
	let fixture: ComponentFixture<ClientMarketplaceSupplierFiltersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientMarketplaceSupplierFiltersComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientMarketplaceSupplierFiltersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
