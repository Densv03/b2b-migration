import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientMarketplaceListingGirdComponent } from "./client-marketplace-listing-grid.component";

describe("ClientMarketplaceListingGirdComponent", () => {
	let component: ClientMarketplaceListingGirdComponent;
	let fixture: ComponentFixture<ClientMarketplaceListingGirdComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientMarketplaceListingGirdComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientMarketplaceListingGirdComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
