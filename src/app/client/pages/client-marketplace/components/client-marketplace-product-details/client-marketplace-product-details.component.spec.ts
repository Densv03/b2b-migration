import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientMarketplaceProductDetailsComponent } from "./client-marketplace-product-details.component";

describe("ClientMarketplaceProductDetailsComponent", () => {
	let component: ClientMarketplaceProductDetailsComponent;
	let fixture: ComponentFixture<ClientMarketplaceProductDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientMarketplaceProductDetailsComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientMarketplaceProductDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
