import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientMarketplaceListingListComponent } from "./client-marketplace-listing-list.component";

describe("ClientMarketplaceListingListComponent", () => {
	let component: ClientMarketplaceListingListComponent;
	let fixture: ComponentFixture<ClientMarketplaceListingListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientMarketplaceListingListComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientMarketplaceListingListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
