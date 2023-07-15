import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientMarketplaceSupplierInfoComponent } from "./client-marketplace-supplier-info.component";

describe("ClientMarketplaceSupplierInfoComponent", () => {
	let component: ClientMarketplaceSupplierInfoComponent;
	let fixture: ComponentFixture<ClientMarketplaceSupplierInfoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ClientMarketplaceSupplierInfoComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientMarketplaceSupplierInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
