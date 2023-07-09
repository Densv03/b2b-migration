import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientMarketplaceFiltersMobileComponent } from "./client-marketplace-filters-mobile.component";

describe("ClientMarketplaceFiltersMobileComponent", () => {
	let component: ClientMarketplaceFiltersMobileComponent;
	let fixture: ComponentFixture<ClientMarketplaceFiltersMobileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientMarketplaceFiltersMobileComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientMarketplaceFiltersMobileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
