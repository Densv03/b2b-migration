import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientMarketplaceSupplierListingComponent } from "./client-marketplace-supplier-listing.component";

describe("ClientMarketplaceSupplierListingComponent", () => {
	let component: ClientMarketplaceSupplierListingComponent;
	let fixture: ComponentFixture<ClientMarketplaceSupplierListingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientMarketplaceSupplierListingComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientMarketplaceSupplierListingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
