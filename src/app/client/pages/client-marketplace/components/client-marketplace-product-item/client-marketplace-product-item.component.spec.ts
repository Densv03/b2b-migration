import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientMarketplaceProductItemComponent } from "./client-marketplace-product-item.component";

describe("ClientMarketplaceProductItemComponent", () => {
	let component: ClientMarketplaceProductItemComponent;
	let fixture: ComponentFixture<ClientMarketplaceProductItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientMarketplaceProductItemComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientMarketplaceProductItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
