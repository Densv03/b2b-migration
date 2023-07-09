import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileMarketplaceProductItemComponent } from "./client-profile-marketplace-product-item.component";

describe("ClientProfileMarketplaceProductItemComponent", () => {
	let component: ClientProfileMarketplaceProductItemComponent;
	let fixture: ComponentFixture<ClientProfileMarketplaceProductItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileMarketplaceProductItemComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileMarketplaceProductItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
