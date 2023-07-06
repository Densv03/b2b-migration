import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientProfileMarketplaceEditProductComponent } from "./client-profile-marketplace-edit-product.component";

describe("ClientProfileMarketplaceEditProductComponent", () => {
	let component: ClientProfileMarketplaceEditProductComponent;
	let fixture: ComponentFixture<ClientProfileMarketplaceEditProductComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientProfileMarketplaceEditProductComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientProfileMarketplaceEditProductComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
