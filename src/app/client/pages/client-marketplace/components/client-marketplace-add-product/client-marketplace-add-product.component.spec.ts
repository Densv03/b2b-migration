import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientMarketplaceAddProductComponent } from "./client-marketplace-add-product.component";

describe("ClientMarketplaceAddProductComponent", () => {
	let component: ClientMarketplaceAddProductComponent;
	let fixture: ComponentFixture<ClientMarketplaceAddProductComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientMarketplaceAddProductComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientMarketplaceAddProductComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
