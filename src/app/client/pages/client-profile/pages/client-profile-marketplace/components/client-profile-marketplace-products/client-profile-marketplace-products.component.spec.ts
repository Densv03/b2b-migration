import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileMarketplaceProductsComponent } from "./client-profile-marketplace-products.component";

describe("ClientProfileMarketplaceProductsComponent", () => {
	let component: ClientProfileMarketplaceProductsComponent;
	let fixture: ComponentFixture<ClientProfileMarketplaceProductsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileMarketplaceProductsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileMarketplaceProductsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
